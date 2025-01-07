package com.parrot.pantry.parrotpantry.parrot;

import com.parrot.pantry.parrotpantry.user.User;
import com.parrot.pantry.parrotpantry.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Service
public class ParrotService {

    private final ParrotRepository parrotRepository;
    private final UserService userService;

    @Autowired
    public ParrotService(ParrotRepository parrotRepository, UserService userService) {
        this.parrotRepository = parrotRepository;
        this.userService = userService;
    }

    public List<Parrot> getParrots() {
        return parrotRepository.findAll();
    }

    public Parrot getParrotById(int id) {
        return parrotRepository.findById(id).orElse(null);
    }

    public void addParrot(Parrot parrot) {
        parrotRepository.save(parrot);
    }

    public void deleteParrotById(int id) {
        parrotRepository.deleteById(id);
    }

    public Parrot updateParrot(int id, Map<String, Object> updates) {
        Parrot parrot = parrotRepository.findById(id).orElse(null);
        if (parrot == null) {
            return null; // Jeśli papuga o podanym ID nie istnieje
        }

        // Iteruj przez mapę i aktualizuj pola, ale pomiń "user_id"
        updates.forEach((key, value) -> {
            switch (key) {
                case "name":
                    parrot.setName((String) value);
                    break;
                case "species":
                    parrot.setSpecies((String) value);
                    break;
                case "birth_date":
                    parrot.setBirth_date(LocalDate.parse((String) value));
                    break;
                case "notes":
                    parrot.setNotes((String) value);
                    break;
                case "user_id":
                    // Ignoruj aktualizację user_id
                    break;
                default:
                    throw new IllegalArgumentException("Unknown field: " + key);
            }
        });

        // Zapisz zmiany w bazie
        return parrotRepository.save(parrot);
    }



}
