package com.blogsite.gateway.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtService {

    private final Key signingKey;

    public JwtService(JwtSigningKeyProvider signingKeyProvider) {
        this.signingKey = signingKeyProvider.getSigningKey();
    }

    public Claims parseToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(signingKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
