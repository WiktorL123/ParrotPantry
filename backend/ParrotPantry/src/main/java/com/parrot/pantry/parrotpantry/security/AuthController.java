package com.parrot.pantry.parrotpantry.security;

import com.parrot.pantry.parrotpantry.user.User;
import com.parrot.pantry.parrotpantry.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class AuthController {

    //auth controller rozdziela CRUD od operacji autoryzacyjnych, niby to jest dobra praktyka
    //ale narazie jeszcze u nas nie ma az takiego zastosowania bo to sa zduplikowane metody z controllera
    //userController

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        try {
            userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body("Użytkownik zarejestrowany pomyślnie!");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

//    @PostMapping("/login")
//    public ResponseEntity<String> login() {
//        return ResponseEntity.ok("Logowanie pomyślne!");
//    }
}
