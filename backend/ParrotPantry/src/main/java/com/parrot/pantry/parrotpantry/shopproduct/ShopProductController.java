package com.parrot.pantry.parrotpantry.shopproduct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shop/product")
public class ShopProductController {

    public final ShopProductService shopProductService;

    @Autowired
    public ShopProductController(ShopProductService shopProductService) {
        this.shopProductService = shopProductService;
    }

    @PostMapping
    public ResponseEntity<ShopProduct> addShopProduct(@RequestBody ShopProduct shopProduct) {
        ShopProduct createdShopProduct = shopProductService.addShopProduct(shopProduct);
        return new ResponseEntity<>(createdShopProduct, HttpStatus.CREATED);
    }

    @GetMapping
    public List<ShopProduct> getShopProducts() {
        return shopProductService.getShopProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ShopProduct> getShopProductById(@PathVariable int id) {
        ShopProduct shopProduct = shopProductService.getShopProductById(id);
        if (shopProduct != null) {
            return new ResponseEntity<>(shopProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShopProduct> updateShopProduct(@PathVariable int id, @RequestBody ShopProduct updatedShopProduct) {
        ShopProduct shopProduct = shopProductService.updateShopProduct(id, updatedShopProduct);
        if (shopProduct != null) {
            return new ResponseEntity<>(shopProduct, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteShopProductById(@PathVariable int id) {
        boolean deleted = shopProductService.deleteShopProductById(id);
        if (deleted) {
            return new ResponseEntity<>("Produkt usuniety pomyslnie", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Produkt nieznaleziony", HttpStatus.NOT_FOUND);
        }
    }
}
