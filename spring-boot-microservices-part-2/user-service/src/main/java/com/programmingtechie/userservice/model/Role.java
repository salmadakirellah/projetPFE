package com.example.userservice.model;

import javax.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Set;

@Entity
@Data
public class Role {
    @Id
    private Long id;
    private String name;  // Chaque rôle a un nom unique

    @OneToMany(mappedBy = "role")  // Relation inverse : un rôle peut avoir plusieurs utilisateurs
    @JsonIgnore  // Ignorer cette relation lors de la sérialisation JSON
    private Set<User> users;  // Les utilisateurs liés à ce rôle
}
