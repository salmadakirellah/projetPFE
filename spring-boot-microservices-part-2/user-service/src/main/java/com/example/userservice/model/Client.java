package com.example.userservice.model;

import javax.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Client extends User {
    private String adresse;
    private String telephone;
    private String typeCultures;
}
