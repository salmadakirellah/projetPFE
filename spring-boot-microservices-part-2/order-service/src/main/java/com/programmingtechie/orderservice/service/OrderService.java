package com.programmingtechie.orderservice.service;

import com.programmingtechie.orderservice.dto.InventoryResponse;
import com.programmingtechie.orderservice.dto.OrderLineItemsDto;
import com.programmingtechie.orderservice.dto.OrderRequest;
import com.programmingtechie.orderservice.model.Order;
import com.programmingtechie.orderservice.model.OrderLineItems;
import com.programmingtechie.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

    private final OrderRepository orderRepository;
    private final WebClient webClient;

    public void placeOrder(OrderRequest orderRequest) {
        // Créer un objet Order
        Order order = new Order();
        order.setOrderNumber(UUID.randomUUID().toString());

        // Ajouter la date de la commande
        order.setDateCommande(LocalDateTime.now());

        List<OrderLineItemsDto> orderLineItemsDtoList = orderRequest.getOrderLineItemsDtoList();

        List<String> skuCodes = orderLineItemsDtoList.stream()
                .map(OrderLineItemsDto::getSkuCode)
                .toList();

        // Appel à InventoryService pour obtenir les quantités et prix actuels
        InventoryResponse[] inventoryResponses = webClient.get()
                .uri("http://localhost:8082/api/inventory",
                        uriBuilder -> uriBuilder.queryParam("skuCode", skuCodes).build())
                .retrieve()
                .bodyToMono(InventoryResponse[].class)
                .block();

        if (inventoryResponses == null || inventoryResponses.length == 0) {
            throw new IllegalArgumentException("Erreur d'inventaire");
        }

        // Vérifie la disponibilité
        boolean allInStock = Arrays.stream(inventoryResponses)
                .allMatch(InventoryResponse::isInStock);

        if (!allInStock) {
            throw new IllegalArgumentException("Un ou plusieurs produits sont en rupture de stock.");
        }

        // Utilisation d'AtomicReference pour permettre la modification de totalPrice dans la lambda
        AtomicReference<BigDecimal> totalPrice = new AtomicReference<>(BigDecimal.ZERO);

        List<OrderLineItems> orderLineItems = orderLineItemsDtoList.stream()
                .map(dto -> {
                    InventoryResponse inv = Arrays.stream(inventoryResponses)
                            .filter(i -> i.getSkuCode().equals(dto.getSkuCode()))
                            .findFirst()
                            .orElseThrow();

                    OrderLineItems line = new OrderLineItems();
                    line.setSkuCode(dto.getSkuCode());
                    line.setQuantity(dto.getQuantity());
                    line.setPrice(dto.getPrice()); // Prix déjà reçu du frontend

                    // Calcul du prix total et mise à jour via AtomicReference
                    totalPrice.set(totalPrice.get().add(dto.getPrice().multiply(BigDecimal.valueOf(dto.getQuantity()))));

                    return line;
                })
                .toList();

        // Mettre à jour le prix total de la commande
        order.setPrixTotal(totalPrice.get());

        // Ajouter les lignes de commande à la commande
        order.setOrderLineItemsList(orderLineItems);

        // Sauvegarder la commande dans la base de données
        orderRepository.save(order);
    }

    // Méthode pour récupérer toutes les commandes
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
