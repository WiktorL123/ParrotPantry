package com.parrot.pantry.parrotpantry.parrot;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.parrot.pantry.parrotpantry.dietplan.DietPlan;
import com.parrot.pantry.parrotpantry.user.User;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "parrot")
public class Parrot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    @JsonBackReference
    private User user;
    @Column(name = "name")
    private String name;
    @Column(name = "species")
    private String species;
    @Column(name = "birth_date")
    private LocalDate birth_date;
    @Column(name = "notes")
    private String notes;

    @OneToOne(mappedBy = "parrot", cascade = CascadeType.ALL)
    @JsonManagedReference
    private DietPlan dietPlan;

    public Parrot() {
    }

    public Parrot(int id, String name, String species, LocalDate birth_date, String notes) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.birth_date = birth_date;
        this.notes = notes;
    }

    public DietPlan getDietPlan() {
        return dietPlan;
    }

    public void setDietPlan(DietPlan dietPlan) {
        this.dietPlan = dietPlan;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecies() {
        return species;
    }

    public void setSpecies(String species) {
        this.species = species;
    }

    public LocalDate getBirth_date() {
        return birth_date;
    }

    public void setBirth_date(LocalDate birth_date) {
        this.birth_date = birth_date;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
