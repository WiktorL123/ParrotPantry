package com.parrot.pantry.parrotpantry.veterinarian;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/veterinarian")
public class VeterinarianController {

    public final VeterinarianService veterinarianService;

    @Autowired
    public VeterinarianController(VeterinarianService veterinarianService) {
        this.veterinarianService = veterinarianService;
    }

    @GetMapping
    public List<Veterinarian> getVeterinarian() {
        return veterinarianService.getVeterinarian();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Veterinarian> getVeterinarianById(@PathVariable int id) {
        Veterinarian veterinarian = veterinarianService.getVeterinarianById(id);
        if (veterinarian != null) {
            return new ResponseEntity<>(veterinarian, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addVeterinarian(@RequestBody Veterinarian veterinarian) {
        veterinarianService.addVeterinarian(veterinarian);
        return new ResponseEntity<>("Weterynarz został dodany.", HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteVeterinarianById(@PathVariable int id) {
        veterinarianService.deleteVeterinarianById(id);
        return new ResponseEntity<>("Weterynarz został usunięty.", HttpStatus.OK);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<Veterinarian> updateVeterinarian(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        Veterinarian updatedVeterinarian = veterinarianService.updateVeterinarian(id, updates);
        if (updatedVeterinarian != null) {
            return new ResponseEntity<>(updatedVeterinarian, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
