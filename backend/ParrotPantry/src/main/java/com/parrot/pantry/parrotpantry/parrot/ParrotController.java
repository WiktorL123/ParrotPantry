package com.parrot.pantry.parrotpantry.parrot;

import com.parrot.pantry.parrotpantry.user.User;
import com.parrot.pantry.parrotpantry.user.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/parrot")
public class ParrotController {

    public final ParrotService parrotService;
    public final UserService userService;

    @Autowired
    public ParrotController(ParrotService parrotService, UserService userService) {
        this.parrotService = parrotService;
        this.userService = userService;
    }

    @GetMapping()
    public List<Parrot> getParrot() {
        return parrotService.getParrots();
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Parrot> getParrotById(@PathVariable int id) {
        Parrot parrot = parrotService.getParrotById(id);
        if(parrot != null) {
            return new ResponseEntity<>(parrot, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<String> addParrot(@RequestBody Map<String, Object> request) {
        try {
            // Pobierz user_id z JSON-a
            Integer userId = (Integer) request.get("user_id");

            // Znajdź użytkownika w bazie danych
            User user = userService.getUserById(userId);
            if (user == null) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with ID " + userId + " not found.");
            }

            // Utwórz nowy obiekt Parrot na podstawie JSON-a
            Parrot parrot = new Parrot();
            parrot.setUser(user);
            parrot.setName((String) request.get("name"));
            parrot.setSpecies((String) request.get("species"));
            parrot.setBirth_date(LocalDate.parse((String) request.get("birth_date")));
            parrot.setNotes((String) request.get("notes"));

            // Zapisz papugę do bazy danych
            parrotService.addParrot(parrot);

            return ResponseEntity.status(HttpStatus.CREATED).body("Papuga dodana pomyślnie!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: " + e.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Parrot> deleteParrot(@PathVariable int id) {
        try {
            parrotService.deleteParrotById(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Parrot> updateParrot(@PathVariable int id, @RequestBody Map<String, Object> updates) {
        try {
            Parrot updatedParrot = parrotService.updateParrot(id, updates);

            if (updatedParrot == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok(updatedParrot);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}
