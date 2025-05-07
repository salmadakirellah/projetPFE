package com.programmingtechie.userservice.model;


import jakarta.persistence.Entity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Id;

import java.util.Set;

@Entity
public class Role {

    @Id
    private Long id;
    private String name;  // Chaque rôle a un nom unique



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
