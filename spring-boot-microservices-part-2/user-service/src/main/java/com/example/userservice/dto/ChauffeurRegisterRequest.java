package com.example.userservice.dto;

import lombok.Data;

@Data
public class ChauffeurRegisterRequest {
    private String nom;
    private String username;
    private String email;
    private String password;
    private boolean disponibilite;
    private String image; 
    
}
