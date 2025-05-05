package com.example.service_vehicule.service;

import com.example.service_vehicule.model.Vehicule;
import com.example.service_vehicule.Repository.VehiculeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VehiculeService {

    private final VehiculeRepository vehiculeRepository;

    public List<Vehicule> getAllVehicules() {
        return vehiculeRepository.findAll();
    }

    public Vehicule createVehicule(Vehicule vehicule) {
        return vehiculeRepository.save(vehicule);
    }

    public Vehicule updateVehicule(Long id, Vehicule updatedVehicule) {
        Vehicule vehicule = vehiculeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicule not found"));

        vehicule.setMarque(updatedVehicule.getMarque());
        vehicule.setModele(updatedVehicule.getModele());
        vehicule.setImmatriculation(updatedVehicule.getImmatriculation());
        vehicule.setDisponibilite(updatedVehicule.isDisponibilite());

        return vehiculeRepository.save(vehicule);
    }

    public void deleteVehicule(Long id) {
        vehiculeRepository.deleteById(id);
    }

    public Vehicule getVehiculeById(Long id) {
        return vehiculeRepository.findById(id).orElse(null);
    }
    

   
}
