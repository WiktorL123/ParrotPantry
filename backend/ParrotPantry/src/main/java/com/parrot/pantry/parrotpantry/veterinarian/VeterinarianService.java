package com.parrot.pantry.parrotpantry.veterinarian;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class VeterinarianService {

    public final VeterinarianRepository veterinarianRepository;

    @Autowired
    public VeterinarianService(VeterinarianRepository veterinarianRepository) {
        this.veterinarianRepository = veterinarianRepository;
    }

    public List<Veterinarian> getVeterinarian() {
        return veterinarianRepository.findAll();
    }

    public Veterinarian getVeterinarianById(int id) {
        return veterinarianRepository.findById(id).orElse(null);
    }

    public void addVeterinarian(Veterinarian veterinarian) {
        veterinarianRepository.save(veterinarian);
    }

    public void deleteVeterinarianById(int id) {
        veterinarianRepository.deleteById(id);
    }


    public Veterinarian updateVeterinarian(int id, Map<String, Object> updates) {
        Optional<Veterinarian> optionalVeterinarian = veterinarianRepository.findById(id);

        if (optionalVeterinarian.isEmpty()) {
            return null;
        }

        Veterinarian veterinarian = optionalVeterinarian.get();

        // Dynamiczna aktualizacja pól
        updates.forEach((key, value) -> {
            switch (key) {
                case "details":
                    veterinarian.setDetails((String) value);
                    break;
                case "name":
                    veterinarian.setName((String) value);
                    break;
                case "specialization":
                    veterinarian.setSpecialization((String) value);
                    break;
                case "phone":
                    veterinarian.setPhone((String) value);
                    break;
                case "email":
                    veterinarian.setEmail((String) value);
                    break;
                case "location":
                    veterinarian.setLocation((String) value);
                    break;
                default:
                    throw new IllegalArgumentException("Niepoprawne pole: " + key);
            }
        });

        return veterinarianRepository.save(veterinarian);
    }
}

