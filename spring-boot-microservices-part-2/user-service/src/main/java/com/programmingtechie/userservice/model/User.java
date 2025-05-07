package com.programmingtechie.userservice.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;


@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "role", discriminatorType = DiscriminatorType.STRING)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // préférable avec JOINED
    private Long id;
    private String nom;
    private String username;
    private String email;
    private String password;
    private String image;

    @OneToOne (fetch = FetchType.EAGER)
    @JoinColumn(name = "role")
    @JsonIgnore  // Ignorer la sérialisation de la relation role pour éviter les boucles infinies
    private Role role;


    public Long getId() {
        return this.id;
    }

    public String getNom() {
        return this.nom;
    }

    public String getUsername() {
        return this.username;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    public String getImage() {
        return this.image;
    }

    public Role getRole() {
        return this.role;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @JsonIgnore
    public void setRole(Role role) {
        this.role = role;
    }

}
