package com.parrot.pantry.parrotpantry.dietplan;

import com.parrot.pantry.parrotpantry.parrot.Parrot;
import com.parrot.pantry.parrotpantry.parrot.ParrotService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dietplan")
public class DietPlanController {

    private final DietPlanService dietPlanService;
    private final ParrotService parrotService;

    @Autowired
    public DietPlanController(DietPlanService dietPlanService, ParrotService parrotService) {
        this.dietPlanService = dietPlanService;
        this.parrotService = parrotService;
    }

    @GetMapping
    public List<DietPlan> getDietPlan() {
        return dietPlanService.getDietPlan();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<DietPlan> getDietPlanById(@PathVariable int id) {
        DietPlan dietPlan = dietPlanService.getDietPlanById(id);
        if (dietPlan != null) {
            return new ResponseEntity<>(dietPlan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addDietPlan(@RequestBody Map<String, Object> request) {
        try {
            Integer parrotId = (Integer) request.get("parrot_id");

            Parrot parrot = parrotService.getParrotById(parrotId);
            if (parrot == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Papuga z ID: " + parrotId + " nie zostala znaleziona");
            }

            // Utwórz nowy obiekt DietPlan na podstawie danych z żądania
            DietPlan dietPlan = new DietPlan();
            dietPlan.setParrot(parrot);
            dietPlan.setDetails((String) request.get("details"));

            // Zapisz plan dietetyczny
            dietPlanService.addDietPlan(dietPlan);

            return ResponseEntity.status(HttpStatus.CREATED).body("Plan dietetyczny dodany pomyslnie!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<DietPlan> updateDietPlan(@PathVariable int id, @RequestBody DietPlan updatedDietPlan) {
        try {
            DietPlan updatedPlan = dietPlanService.updateDietPlan(id, updatedDietPlan);
            return new ResponseEntity<>(updatedPlan, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> deleteDietPlan(@PathVariable int id) {
        try {
            dietPlanService.deleteDietPlanById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

