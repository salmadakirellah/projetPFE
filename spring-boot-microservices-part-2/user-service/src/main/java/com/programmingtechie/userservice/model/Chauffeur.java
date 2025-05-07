package com.programmingtechie.userservice.model;



import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;


@Entity
@DiscriminatorValue("CHAUFFEUR")
public class Chauffeur extends User {
     
    private boolean disponibilite;

    public Chauffeur() {
    }

    public Chauffeur(Long id, String nom, String username, String email, String password, String image, Role role, boolean disponibilite) {
        super(id, nom, username, email, password, image, role);
        this.disponibilite = disponibilite;
    }

    public boolean isDisponibilite() {
        return disponibilite;
    }

    public void setDisponibilite(boolean disponibilite) {
        this.disponibilite = disponibilite;
    }
}
