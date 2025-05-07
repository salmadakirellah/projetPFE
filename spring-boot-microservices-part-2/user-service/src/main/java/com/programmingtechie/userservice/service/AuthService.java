package com.programmingtechie.userservice.service;


import com.programmingtechie.userservice.dto.*;
import com.programmingtechie.userservice.model.*;
import com.programmingtechie.userservice.repository.*;

import com.programmingtechie.userservice.security.CustomUserDetails;
import com.programmingtechie.userservice.security.jwt.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthService {

    private final UserRepository userRepository;
    private final ClientRepository clientRepository;
    private final ChauffeurRepository chauffeurRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;


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

        User user = new User();
        user.setNom(request.getNom());
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setImage(request.getImage());
        user.setRole(role);

        userRepository.save(user);
    }

    // Login commun
    public AuthResponse login(AuthRequest request) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword());
        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(token);
        } catch (BadCredentialsException e) {
            throw new RuntimeException("Incorrect Credentials");
        }

        if (authentication.getPrincipal() instanceof CustomUserDetails customUser) {
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.info("is user authenticated: " + SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
            log.info("authorities" + customUser.getAuthorities().toString());
            return new AuthResponse(JwtUtil.generateToken(customUser), request.getUsername(), customUser.getAuthorities().toString());
        } else {
            throw new RuntimeException("Incorrect Credentials");
        }
    }
}
