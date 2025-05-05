    package com.example.userservice.service;

import com.example.userservice.dto.*;
import com.example.userservice.model.*;
import com.example.userservice.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final ChauffeurRepository chauffeurRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // Enregistrement du client avec ses propres infos
    public void registerClient(ClientRegisterRequest request) {
        Role role = roleRepository.findByName("CLIENT")
                .orElseThrow(() -> new RuntimeException("Role CLIENT not found"));

        Client client = new Client();
        client.setNom(request.getNom());
        client.setUsername(request.getUsername());
        client.setEmail(request.getEmail());
        client.setPassword(passwordEncoder.encode(request.getPassword()));
        client.setAdresse(request.getAdresse());
        client.setTelephone(request.getTelephone());
        client.setTypeCultures(request.getTypeCultures());
        client.setImage(request.getImage()); 
        client.setRole(role);

        clientRepository.save(client);
    }

    // Enregistrement du chauffeur avec ses propres infos
    public void registerChauffeur(ChauffeurRegisterRequest request) {
        Role role = roleRepository.findByName("CHAUFFEUR")
                .orElseThrow(() -> new RuntimeException("Role CHAUFFEUR not found"));

        Chauffeur chauffeur = new Chauffeur();
        chauffeur.setNom(request.getNom());
        chauffeur.setUsername(request.getUsername());
        chauffeur.setEmail(request.getEmail());
        chauffeur.setPassword(passwordEncoder.encode(request.getPassword()));
         
        chauffeur.setDisponibilite(request.isDisponibilite());
        chauffeur.setImage(request.getImage()); 
        chauffeur.setRole(role);

        chauffeurRepository.save(chauffeur);
    }

    // Enregistrement de l'admin
    public void registerAdmin(AdminRegisterRequest request) {
        Role role = roleRepository.findByName("ADMIN")
                .orElseThrow(() -> new RuntimeException("Role ADMIN not found"));

        Admin admin = new Admin();
        admin.setNom(request.getNom());
        admin.setUsername(request.getUsername());
        admin.setEmail(request.getEmail());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin.setImage(request.getImage()); 
        admin.setRole(role);

        userRepository.save(admin);
    }

    // Login commun
    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            String token = jwtService.generateToken(user.getUsername(), user.getRole());

            // Return a response with token, username, and role
            return new AuthResponse(token, user.getUsername(), user.getRole().getName());
        } else {
            throw new RuntimeException("Invalid credentials");
        }
    }
}
