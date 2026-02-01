package com.blogsite.gateway.security;

import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.security.Key;

@Component
public class JwtSigningKeyProvider {

    private final Key signingKey;

    public JwtSigningKeyProvider(
            @Value("${security.jwt.secret-file:/run/secrets/jwt_secret}") String secretFilePath,
            @Value("${security.jwt.secret:}") String secretFallback
    ) {
        String secret = loadSecret(secretFilePath, secretFallback);
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.signingKey = Keys.hmacShaKeyFor(keyBytes);
    }

    private String loadSecret(String secretFilePath, String secretFallback) {
        try {
            Path path = Path.of(secretFilePath);
            if (Files.exists(path)) {
                return Files.readString(path).trim();
            }
        } catch (IOException ignored) {
        }
        if (secretFallback == null || secretFallback.isBlank()) {
            throw new IllegalStateException("JWT secret not configured");
        }
        return secretFallback.trim();
    }

    public Key getSigningKey() {
        return signingKey;
    }
}
