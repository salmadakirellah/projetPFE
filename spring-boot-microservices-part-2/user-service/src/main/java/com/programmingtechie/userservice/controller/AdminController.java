package com.programmingtechie.userservice.controller;

import com.programmingtechie.userservice.model.Client;
import com.programmingtechie.userservice.model.Chauffeur;
import com.programmingtechie.userservice.model.Role;
import com.programmingtechie.userservice.repository.ClientRepository;
import com.programmingtechie.userservice.repository.ChauffeurRepository;
import com.programmingtechie.userservice.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;


import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final ClientRepository clientRepository;
    private final ChauffeurRepository chauffeurRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder; // ➡️ Injecter PasswordEncoder ici aussi

    // -- CRUD Clients --
    @GetMapping("/clients")
    public List<Client> getClients() {
        return clientRepository.findAll();
    }

    @PostMapping("/clients")
    public Client createClient(@RequestBody Client client) {
        Role clientRole = roleRepository.findByName("CLIENT")
                .orElseThrow(() -> new RuntimeException("Role 'CLIENT' not found"));
        client.setRole(clientRole);
        
        // ➡️ Encoder le mot de passe
        client.setPassword(passwordEncoder.encode(client.getPassword()));
        
        return clientRepository.save(client);
    }

    @PutMapping("/clients/{id}")
    public Client updateClient(@PathVariable Long id, @RequestBody Client updated) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Client not found"));

        Role clientRole = roleRepository.findByName("CLIENT")
                .orElseThrow(() -> new RuntimeException("Role 'CLIENT' not found"));

        client.setAdresse(updated.getAdresse());
        client.setTelephone(updated.getTelephone());
        client.setTypeCultures(updated.getTypeCultures());
        client.setRole(clientRole);

        // ➡️ Optionnel : Si tu veux aussi permettre de modifier le mot de passe :
        if (updated.getPassword() != null && !updated.getPassword().isEmpty()) {
            client.setPassword(passwordEncoder.encode(updated.getPassword()));
        }

        return clientRepository.save(client);
    }

    @DeleteMapping("/clients/{id}")
    public void deleteClient(@PathVariable Long id) {
        clientRepository.deleteById(id);
    }

    // -- CRUD Chauffeurs --
    @GetMapping("/chauffeurs")
    public List<Chauffeur> getChauffeurs() {
        return chauffeurRepository.findAll();
    }

    @PostMapping("/chauffeurs")
    public Chauffeur createChauffeur(@RequestBody Chauffeur chauffeur) {
        Role chauffeurRole = roleRepository.findByName("CHAUFFEUR")
                .orElseThrow(() -> new RuntimeException("Role 'CHAUFFEUR' not found"));
        chauffeur.setRole(chauffeurRole);
        
        // ➡️ Encoder le mot de passe
        chauffeur.setPassword(passwordEncoder.encode(chauffeur.getPassword()));
        
        return chauffeurRepository.save(chauffeur);
    }

    @PutMapping("/chauffeurs/{id}")
    public Chauffeur updateChauffeur(@PathVariable Long id, @RequestBody Chauffeur updated) {
        Chauffeur chauffeur = chauffeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chauffeur not found"));

        Role chauffeurRole = roleRepository.findByName("CHAUFFEUR")
                .orElseThrow(() -> new RuntimeException("Role 'CHAUFFEUR' not found"));

        chauffeur.setDisponibilite(updated.isDisponibilite());
         
        chauffeur.setRole(chauffeurRole);

        // ➡️ Optionnel : modifier le mot de passe aussi
        if (updated.getPassword() != null && !updated.getPassword().isEmpty()) {
            chauffeur.setPassword(passwordEncoder.encode(updated.getPassword()));
        }

        return chauffeurRepository.save(chauffeur);
    }

    @DeleteMapping("/chauffeurs/{id}")
    public void deleteChauffeur(@PathVariable Long id) {
        chauffeurRepository.deleteById(id);
    }

    // ✅ Récupérer un client par ID

    @GetMapping("/clients/{id}")
    public ResponseEntity<Client> getClientById(@PathVariable Long id) {
    return clientRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

// ✅ Récupérer un chauffeur par ID

    @GetMapping("/chauffeurs/{id}")

    public ResponseEntity<Chauffeur> getChauffeurById(@PathVariable Long id) {
        return chauffeurRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
}

}
