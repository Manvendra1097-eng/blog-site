package com.blogsite.auth.service;

import com.blogsite.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@Order(1)
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final UserService userService;

    @Value("${admin.username:admin}")
    private String adminUsername;

    @Value("${admin.email:admin@blogsite.com}")
    private String adminEmail;

    @Value("${admin.password:Admin1234}")
    private String adminPassword;

    public AdminSeeder(UserRepository userRepository, UserService userService) {
        this.userRepository = userRepository;
        this.userService = userService;
    }

    @Override
    public void run(String... args) {
        if (userRepository.existsByEmail(adminEmail)) {
            return;
        }
        userService.registerUser(adminUsername, adminEmail, adminPassword, true);
    }
}
