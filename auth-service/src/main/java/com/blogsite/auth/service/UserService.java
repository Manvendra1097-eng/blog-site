package com.blogsite.auth.service;

import com.blogsite.auth.domain.Role;
import com.blogsite.auth.domain.User;
import com.blogsite.auth.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public User registerUser(String username, String email, String rawPassword, boolean admin) {
        // Normalize username to prevent case variations
        String normalizedUsername = username.trim();

        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException("Email already in use");
        }
        if (userRepository.existsByUsername(normalizedUsername)) {
            throw new IllegalArgumentException("Username already in use");
        }
        User user = new User();
        user.setUsername(normalizedUsername);
        user.setEmail(email);
        user.setPasswordHash(passwordEncoder.encode(rawPassword));
        if (admin) {
            user.setRoles(Collections.singleton(Role.ADMIN));
        } else {
            user.setRoles(Collections.singleton(Role.USER));
        }
        return userRepository.save(user);
    }
}
