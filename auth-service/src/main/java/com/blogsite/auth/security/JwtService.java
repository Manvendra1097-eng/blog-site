package com.blogsite.auth.security;

import com.blogsite.auth.domain.Role;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtService {

    private final Key signingKey;

    public JwtService(JwtSigningKeyProvider signingKeyProvider) {
        this.signingKey = signingKeyProvider.getSigningKey();
    }

    public String generateAccessToken(Long userId, String username, Set<Role> roles) {
        return generateToken(userId, username, roles, 15 * 60, "access"); // 15 minutes
    }

    public String generateRefreshToken(Long userId, String username, Set<Role> roles) {
        return generateToken(userId, username, roles, 7 * 24 * 60 * 60, "refresh"); // 7 days
    }

    private String generateToken(Long userId, String username, Set<Role> roles, long ttlSeconds, String tokenType) {
        Instant now = Instant.now();
        Instant expiry = now.plusSeconds(ttlSeconds);
        String rolesString = roles.stream()
                .map(Enum::name)
                .collect(Collectors.joining(","));

        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("username", username)
                .claim("roles", rolesString)
                .claim("type", tokenType)
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(expiry))
                .signWith(signingKey, SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isRefreshToken(Claims claims) {
        return "refresh".equals(claims.get("type", String.class));
    }

    public Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
