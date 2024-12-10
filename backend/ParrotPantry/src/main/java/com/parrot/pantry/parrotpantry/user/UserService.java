package com.parrot.pantry.parrotpantry.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private UserService(UserRepository UserRepository, PasswordEncoder PasswordEncoder) {
        this.userRepository = UserRepository;
        this.passwordEncoder = PasswordEncoder;
    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public void addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
    }

    public User partiallyUpdateUser(int id, Map<String, Object> updates) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return null;
        }

        updates.forEach((field, value) -> {
            switch (field) {
                case "is_admin":
                    user.setIs_admin((Boolean) value);
                    break;
                case "password":
                    user.setPassword((String) value);
                    break;
                case "email":
                    user.setEmail((String) value);
                    break;
                case "id":
                    //ignorowanie id bo nie moze byc aktualizowane
                    break;
                default:
                    throw new IllegalArgumentException("Invalid field: " + field);
            }
        });

        return userRepository.save(user);
    }



    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

//    public User updateUser(User updatedUser) {
//        Optional<User> optionalUser = userRepository.findById(updatedUser.getId());
//
//        if (optionalUser.isPresent()) {
//            User existingUser = optionalUser.get();
//            if (updatedUser.getUsername() != null) {
//                existingUser.setUsername(updatedUser.getUsername());
//            }
//            if (updatedUser.getPassword() != null) {
//                existingUser.setPassword(updatedUser.getPassword());
//            }
//            if (updatedUser.getEmail() != null) {
//                existingUser.setEmail(updatedUser.getEmail());
//            }
//
//            userRepository.save(existingUser);
//            return existingUser;
//        } else {
//            return null;
//        }
//    }

    public boolean deleteUserById(int id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public User registerUser(User user) {
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("Uzytkownik z podanym emailem juz istnieje!");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}


