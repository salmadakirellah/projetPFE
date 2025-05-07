package com.programmingtechie.userservice.repository;

import com.programmingtechie.userservice.model.Chauffeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChauffeurRepository extends JpaRepository<Chauffeur, Long> {
}
