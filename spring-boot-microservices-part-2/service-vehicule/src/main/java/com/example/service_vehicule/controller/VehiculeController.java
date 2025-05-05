package com.example.service_vehicule.controller;

import com.example.service_vehicule.model.Vehicule;
import com.example.service_vehicule.service.VehiculeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/vehicules")
@RequiredArgsConstructor
public class VehiculeController {

    private final VehiculeService vehiculeService;

    @GetMapping
    public List<Vehicule> getAllVehicules() {
        return vehiculeService.getAllVehicules();
    }

    @PostMapping
    public Vehicule createVehicule(@RequestBody Vehicule vehicule) {
        return vehiculeService.createVehicule(vehicule);
    }

    @PutMapping("/{id}")
    public Vehicule updateVehicule(@PathVariable Long id, @RequestBody Vehicule vehicule) {
        return vehiculeService.updateVehicule(id, vehicule);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicule(@PathVariable Long id) {
        vehiculeService.deleteVehicule(id);
        return ResponseEntity.ok("Vehicule deleted successfully!");
    }

    @GetMapping("/{id}")
public ResponseEntity<Vehicule> getVehiculeById(@PathVariable Long id) {
    Vehicule vehicule = vehiculeService.getVehiculeById(id);
    if (vehicule != null) {
        return ResponseEntity.ok(vehicule);
    } else {
        return ResponseEntity.notFound().build();
    }
}


    
}
