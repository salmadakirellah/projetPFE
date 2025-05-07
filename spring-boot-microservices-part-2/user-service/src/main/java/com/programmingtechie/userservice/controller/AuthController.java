package com.programmingtechie.userservice.controller;

import com.programmingtechie.userservice.dto.*;
import com.programmingtechie.userservice.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@CrossOrigin("*")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    // 🔐 Enregistrement client avec ses infos
    @PostMapping("/register/client")
    public ResponseEntity<?> registerClient(@RequestBody ClientRegisterRequest request) {
        try {
            authService.registerClient(request);
            return ResponseEntity.ok("Client registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

    // 🚗 Enregistrement chauffeur avec ses infos
    @PostMapping("/register/chauffeur")
    public ResponseEntity<?> registerChauffeur(@RequestBody ChauffeurRegisterRequest request) {
        try {
            authService.registerChauffeur(request);
            return ResponseEntity.ok("Chauffeur registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

    // 🔐 Enregistrement admin avec ses infos
    @PostMapping("/register/admin")
    public ResponseEntity<?> registerAdmin(@RequestBody AdminRegisterRequest request) {
        try {
            authService.registerAdmin(request);
            return ResponseEntity.ok("Admin registered successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
    }

     // 🔑 Connexion pour tout le monde (admin, client, chauffeur)
     @PostMapping("/login")
     public ResponseEntity<?> login(@RequestBody AuthRequest request) {
         try {
             AuthResponse response = authService.login(request);
             return ResponseEntity.ok(response);
         } catch (RuntimeException e) {
             return ResponseEntity.status(401).body("Invalid credentials");
         }
     }
}
