package com.parrot.pantry.parrotpantry.dietplan;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DietPlanService {

    private final DietPlanRepository dietPlanRepository;

    @Autowired
    public DietPlanService(DietPlanRepository dietPlanRepository) {
        this.dietPlanRepository = dietPlanRepository;
    }

    public List<DietPlan> getDietPlan() {
        return dietPlanRepository.findAll();
    }

    public DietPlan getDietPlanById(int id) {
        return dietPlanRepository.findById(id).orElse(null);
    }

    public void addDietPlan(DietPlan dietPlan) {
        dietPlanRepository.save(dietPlan);
    }

    public void deleteDietPlanById(int id) {
        if(!dietPlanRepository.existsById(id)) {
            throw new EntityNotFoundException("Plan dietetyczny z podanym id nie istnieje!");
        }
        dietPlanRepository.deleteById(id);
    }

    public DietPlan updateDietPlan(int id, DietPlan updatedDietPlan) {
        return dietPlanRepository.findById(id).map(existingDietPlan -> {
            existingDietPlan.setParrot(updatedDietPlan.getParrot());
            existingDietPlan.setDetails(updatedDietPlan.getDetails());
            return dietPlanRepository.save(existingDietPlan);
        }).orElseThrow(() -> new EntityNotFoundException("Plan dietetyczny z podanym id nie istnieje!"));
    }
}
