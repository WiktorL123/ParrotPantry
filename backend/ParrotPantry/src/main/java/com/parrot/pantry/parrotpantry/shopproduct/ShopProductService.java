package com.parrot.pantry.parrotpantry.shopproduct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShopProductService {

    public final ShopProductRepository shopProductRepository;

    @Autowired
    public ShopProductService(ShopProductRepository shopProductRepository) {
        this.shopProductRepository = shopProductRepository;
    }

    public ShopProduct addShopProduct(ShopProduct shopProduct) {
        return shopProductRepository.save(shopProduct);
    }

    public List<ShopProduct> getShopProducts() {
        return shopProductRepository.findAll();
    }

    public ShopProduct getShopProductById(int id) {
        return shopProductRepository.findById(id).orElse(null);
    }

    public ShopProduct updateShopProduct(int id, ShopProduct updatedShopProduct) {
        Optional<ShopProduct> optionalShopProduct = shopProductRepository.findById(id);

        if (optionalShopProduct.isEmpty()) {
            return null;
        }

        ShopProduct shopProduct = optionalShopProduct.get();
        shopProduct.setName(updatedShopProduct.getName());
        shopProduct.setDescription(updatedShopProduct.getDescription());
        shopProduct.setPrice(updatedShopProduct.getPrice());
        shopProduct.setAvailability(updatedShopProduct.getAvailability());

        return shopProductRepository.save(shopProduct);
    }

    public boolean deleteShopProductById(int id) {
        if (shopProductRepository.existsById(id)) {
            shopProductRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
