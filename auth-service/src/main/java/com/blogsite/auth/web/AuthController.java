
package com.blogsite.auth.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import com.blogsite.auth.domain.User;
import com.blogsite.auth.repository.UserRepository;
import com.blogsite.auth.security.JwtService;
import com.blogsite.auth.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1.0/blogsite/user")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthController(UserService userService, UserRepository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public record RegisterRequest(
            @NotBlank @Size(min = 3, max = 50) String username,
            @NotBlank @Email(regexp = ".+@.+\\.com") String email,
            @NotBlank @Size(min = 8) @Pattern(regexp = "(?=.*[A-Za-z])(?=.*[0-9]).*", message = "Password must be alphanumeric") String password
    ) {}

    public record LoginRequest(
            @NotBlank String username,
            @NotBlank String password
    ) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest request) {
        User user = userService.registerUser(request.username(), request.email(), request.password(), false);
        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail()
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        // Prevent timing attacks by always hashing even if user doesn't exist
        String dummyHash = "$2a$10$dummyHashToPreventTimingAttacksXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";

        Optional<User> userOpt = userRepository.findByUsername(request.username());
        String hashToCheck = userOpt.map(User::getPasswordHash).orElse(dummyHash);

        boolean matches = passwordEncoder.matches(request.password(), hashToCheck);

        if (!userOpt.isPresent() || !matches) {
            throw new IllegalArgumentException("Invalid credentials");
        }

        User user = userOpt.get();
        String accessToken = jwtService.generateAccessToken(user.getId(), user.getUsername(), user.getRoles());
        String refreshToken = jwtService.generateRefreshToken(user.getId(), user.getUsername(), user.getRoles());

        ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", refreshToken)
            .httpOnly(true)
            .secure(false)
            .path("/")
            .sameSite("Lax")
            .maxAge(7 * 24 * 60 * 60)
            .build();

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
            .body(Map.of(
                "accessToken", accessToken,
                "username", user.getUsername(),
                "roles", user.getRoles()
            ));
    }

    @PostMapping("/refresh")
        public ResponseEntity<?> refresh(@CookieValue(name = "refreshToken", required = false) String refreshToken) {
        if (refreshToken == null || refreshToken.isBlank()) {
            throw new IllegalArgumentException("Refresh token required");
        }

        try {
            var claims = jwtService.parseToken(refreshToken);

            // Verify it's a refresh token
            if (!jwtService.isRefreshToken(claims)) {
                throw new IllegalArgumentException("Invalid token type");
            }

            Long userId = Long.parseLong(claims.getSubject());

            // Verify user still exists
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new IllegalArgumentException("User not found"));

            // Generate new tokens
                String newAccessToken = jwtService.generateAccessToken(user.getId(), user.getUsername(), user.getRoles());
                String newRefreshToken = jwtService.generateRefreshToken(user.getId(), user.getUsername(), user.getRoles());

                ResponseCookie refreshCookie = ResponseCookie.from("refreshToken", newRefreshToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .sameSite("Lax")
                    .maxAge(7 * 24 * 60 * 60)
                    .build();

                return ResponseEntity.ok()
                    .header(HttpHeaders.SET_COOKIE, refreshCookie.toString())
                    .body(Map.of(
                        "accessToken", newAccessToken,
                        "username", user.getUsername()
                    ));
        } catch (Exception e) {
            throw new IllegalArgumentException("Invalid or expired refresh token");
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        // Clear the refresh token cookie
        ResponseCookie clearCookie = ResponseCookie.from("refreshToken", "")
            .httpOnly(true)
            .secure(false)
            .path("/")
            .sameSite("Lax")
            .maxAge(0)  // Expire immediately
            .build();

        return ResponseEntity.ok()
            .header(HttpHeaders.SET_COOKIE, clearCookie.toString())
            .body(Map.of("message", "Logged out successfully"));
    }

    @GetMapping("/verify/{userId}")
    public ResponseEntity<?> verifyUser(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found or inactive"));

        return ResponseEntity.ok(Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "roles", user.getRoles().stream()
                        .map(Enum::name)
                        .collect(java.util.stream.Collectors.joining(","))
        ));
    }
}
