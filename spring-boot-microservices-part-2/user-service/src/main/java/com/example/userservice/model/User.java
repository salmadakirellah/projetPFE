package com.example.userservice.model;

import javax.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // préférable avec JOINED
    private Long id;
    private String nom;
    private String username;
    private String email;
    private String password;
    private String image; 

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "role_id")
    @JsonIgnore  // Ignorer la sérialisation de la relation role pour éviter les boucles infinies
    private Role role;
}
