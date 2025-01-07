package com.parrot.pantry.parrotpantry.shop;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shop")
public class ShopController {

    private final ShopService shopService;

    @Autowired
    public ShopController(ShopService shopService) {
        this.shopService = shopService;
    }

    @PostMapping
    public ResponseEntity<Shop> addShop(@RequestBody Shop shop) {
        Shop createdShop = shopService.addShop(shop);
        return new ResponseEntity<>(createdShop, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Shop> getShops() {
        return shopService.getShops();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Shop> getShopById(@PathVariable int id) {
        Shop shop = shopService.getShopById(id);
        if (shop != null) {
            return new ResponseEntity<>(shop, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Shop> updateShop(@PathVariable int id, @RequestBody Shop updatedShop) {
        Shop shop = shopService.updateShop(id, updatedShop);
        if (shop != null) {
            return new ResponseEntity<>(shop, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShopById(@PathVariable int id) {
        boolean deleted = shopService.deleteShopById(id);
        if (deleted) {
            return new ResponseEntity<>("sklep usuniety pomyslnie", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("sklep nieznaleziony", HttpStatus.NOT_FOUND);
        }
    }
}
