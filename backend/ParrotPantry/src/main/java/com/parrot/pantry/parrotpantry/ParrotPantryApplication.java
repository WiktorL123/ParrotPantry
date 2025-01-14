package com.parrot.pantry.parrotpantry;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.parrot.pantry")
public class ParrotPantryApplication {

    public static void main(String[] args) {
        SpringApplication.run(ParrotPantryApplication.class, args);
    }

}
