package com.blogsite.auth.service;

import com.blogsite.auth.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(2)
public class UserSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final UserService userService;

    public UserSeeder(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public void run(String... args) {
        String userEmail = "user@blogsite.com";
        if (userRepository.existsByEmail(userEmail)) {
            return;
        }
        userService.registerUser("user", userEmail, "User1234", false);
    }
}
