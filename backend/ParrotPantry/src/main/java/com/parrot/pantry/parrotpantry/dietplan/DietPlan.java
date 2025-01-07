package com.parrot.pantry.parrotpantry.dietplan;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.parrot.pantry.parrotpantry.parrot.Parrot;
import jakarta.persistence.*;

@Entity
@Table(name = "diet_plan")
public class DietPlan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @OneToOne
    @JoinColumn(name = "parrot_id", nullable = false)
    @JsonBackReference
    private Parrot parrot;
    @Column(name = "details", nullable = false)
    private String details;

    public DietPlan() {
    }

    public DietPlan(int id, Parrot parrot, String details) {
        this.id = id;
        this.parrot = parrot;
        this.details = details;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Parrot getParrot() {
        return parrot;
    }

    public void setParrot(Parrot parrot) {
        this.parrot = parrot;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

    @Override
    public String toString() {
        return "DietPlan{" +
                "id=" + id +
                ", parrot=" + parrot +
                ", details='" + details + '\'' +
                '}';
    }
}
