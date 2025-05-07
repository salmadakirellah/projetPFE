package com.programmingtechie.userservice.dto;

import lombok.Data;

@Data
public class ClientRegisterRequest {
    private String nom;
    private String username;
    private String email;
    private String password;
    private String adresse;
    private String telephone;
    private String typeCultures;
    private String image; 
    
}
