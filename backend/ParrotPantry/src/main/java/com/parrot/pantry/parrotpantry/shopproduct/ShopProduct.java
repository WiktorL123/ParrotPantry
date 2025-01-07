package com.parrot.pantry.parrotpantry.shopproduct;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.parrot.pantry.parrotpantry.shop.Shop;
import jakarta.persistence.*;
import java.util.Set;

@Entity
@Table(name = "shop_product")
public class ShopProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", nullable = true)
    private String description;

    @Column(name = "price", nullable = false)
    private double price;

    @Enumerated(EnumType.STRING)
    @Column(name = "availability", nullable = false)
    private ProductAvailability availability;

    @ManyToMany(mappedBy = "products")
    private Set<Shop> shops;

    public ShopProduct() {}

    public ShopProduct(String name, String description, double price, ProductAvailability availability) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.availability = availability;
    }

    // Gettery i Settery
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public ProductAvailability getAvailability() {
        return availability;
    }

    public void setAvailability(ProductAvailability availability) {
        this.availability = availability;
    }

    public Set<Shop> getShops() {
        return shops;
    }

    public void setShops(Set<Shop> shops) {
        this.shops = shops;
    }
}
