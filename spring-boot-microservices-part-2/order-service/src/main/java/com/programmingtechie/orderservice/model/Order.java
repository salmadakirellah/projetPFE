package com.programmingtechie.orderservice.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;
import java.time.LocalDateTime;
import java.math.BigDecimal;


@Entity
@Table(name = "t_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderNumber;
    // Nouveaux attributs
    private LocalDateTime dateCommande; // Date de la commande
    private BigDecimal prixTotal; // Prix total de la commande
    private String statut = "A livrer"; // Statut de la commande par défaut



    @OneToMany(cascade = CascadeType.ALL)
    private List<OrderLineItems> orderLineItemsList;
}
