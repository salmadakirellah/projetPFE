package com.programmingtechie.userservice.dto;

import lombok.Data;

@Data
public class AdminRegisterRequest {
    private String nom;
    private String username;
    private String email;
    private String password;
    private String image; 
}
