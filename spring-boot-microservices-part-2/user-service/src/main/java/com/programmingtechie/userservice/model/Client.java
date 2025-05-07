package com.programmingtechie.userservice.model;

import jakarta.persistence.Entity;
import lombok.*;


@Entity
public class Client extends User {

    private String adresse;
    private String telephone;
    private String typeCultures;

    public Client() {
    }

    public Client(Long id, String nom, String username, String email, String password, String image, Role role, String adresse, String telephone, String typeCultures) {
        super(id, nom, username, email, password, image, role);
        this.adresse = adresse;
        this.telephone = telephone;
        this.typeCultures = typeCultures;
    }


    public String getAdresse() {
        return adresse;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getTelephone() {
        return telephone;
    }

    public void setTelephone(String telephone) {
        this.telephone = telephone;
    }

    public String getTypeCultures() {
        return typeCultures;
    }

    public void setTypeCultures(String typeCultures) {
        this.typeCultures = typeCultures;
    }
}
