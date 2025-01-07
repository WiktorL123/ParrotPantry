package com.parrot.pantry.parrotpantry.shop;

import com.parrot.pantry.parrotpantry.shopproduct.ShopProduct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShopService {

    private final ShopRepository shopRepository;

    @Autowired
    public ShopService(ShopRepository shopRepository) {
        this.shopRepository = shopRepository;
    }

    public Shop addShop(Shop shop) {
        return shopRepository.save(shop);
    }

    public List<Shop> getShops() {
        return shopRepository.findAll();
    }

    public Shop getShopById(int id) {
        return shopRepository.findById(id).orElse(null);
    }

    public Shop updateShop(int id, Shop updatedShop) {
        Optional<Shop> optionalShop = shopRepository.findById(id);

        if (optionalShop.isEmpty()) {
            return null;
        }

        Shop shop = optionalShop.get();
        shop.setName(updatedShop.getName());
        shop.setType(updatedShop.getType());
        shop.setAddress(updatedShop.getAddress());
        shop.setPhone(updatedShop.getPhone());
        shop.setEmail(updatedShop.getEmail());
        shop.setWebsite(updatedShop.getWebsite());

        return shopRepository.save(shop);
    }

    public boolean deleteShopById(int id) {
        if (shopRepository.existsById(id)) {
            shopRepository.deleteById(id);
            return true;
        }
        return false;
    }

    // Nowa metoda: przypisywanie produktu do sklepu
    public Shop assignProductToShop(int shopId, ShopProduct product) {
        Optional<Shop> optionalShop = shopRepository.findById(shopId);

        if (optionalShop.isEmpty()) {
            return null;
        }

        Shop shop = optionalShop.get();
        shop.getProducts().add(product);
        return shopRepository.save(shop);
    }

    // Nowa metoda: usuwanie produktu ze sklepu
    public Shop removeProductFromShop(int shopId, int productId) {
        Optional<Shop> optionalShop = shopRepository.findById(shopId);

        if (optionalShop.isEmpty()) {
            return null;
        }

        Shop shop = optionalShop.get();
        shop.getProducts().removeIf(product -> product.getId() == productId);
        return shopRepository.save(shop);
    }

    // Nowa metoda: pobieranie produktów przypisanych do sklepu
    public List<ShopProduct> getProductsByShop(int shopId) {
        Optional<Shop> optionalShop = shopRepository.findById(shopId);

        if (optionalShop.isEmpty()) {
            return null;
        }

        return List.copyOf(optionalShop.get().getProducts());
    }
}