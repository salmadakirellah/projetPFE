package com.example.userservice.model;

import javax.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Chauffeur extends User {
     
    private boolean disponibilite;
}
