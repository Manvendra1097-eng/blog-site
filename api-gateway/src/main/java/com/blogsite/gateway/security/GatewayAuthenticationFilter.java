package com.blogsite.gateway.security;

import io.jsonwebtoken.Claims;
import org.springframework.core.Ordered;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.util.List;

@Component
public class GatewayAuthenticationFilter implements GlobalFilter, Ordered {

    private final JwtService jwtService;

    public GatewayAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        // Always let CORS preflight requests pass so that CORS config can respond.
        if (exchange.getRequest().getMethod() == HttpMethod.OPTIONS) {
            return chain.filter(exchange);
        }

        URI uri = exchange.getRequest().getURI();
        String path = uri.getPath();

        if (isPublicPath(path)) {
            return chain.filter(exchange);
        }

        List<String> authHeaders = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION);
        if (authHeaders == null || authHeaders.isEmpty()) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }
        String authHeader = authHeaders.get(0);
        if (!authHeader.startsWith("Bearer ")) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String token = authHeader.substring(7);
        Claims claims;
        try {
            claims = jwtService.parseToken(token);
        } catch (Exception e) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        // Verify it's an access token (not refresh token)
        String tokenType = claims.get("type", String.class);
        if (!"access".equals(tokenType)) {
            exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
            return exchange.getResponse().setComplete();
        }

        String userId = claims.getSubject();
        String username = claims.get("username", String.class);
        String roles = claims.get("roles", String.class);

        // No longer call auth-service for every request. Trust JWT claims.
        // Optionally, check for admin path using roles from JWT.
        if (isAdminOnlyPath(path) && (roles == null || !roles.contains("ADMIN"))) {
            exchange.getResponse().setStatusCode(HttpStatus.FORBIDDEN);
            return exchange.getResponse().setComplete();
        }

        ServerHttpRequest mutatedRequest = exchange.getRequest().mutate()
                .header("X-User-Id", userId)
                .header("X-User-Name", username == null ? "" : username)
                .header("X-User-Roles", roles == null ? "" : roles)
                .build();

        return chain.filter(exchange.mutate().request(mutatedRequest).build());
    }

    private boolean isPublicPath(String path) {
        return path.startsWith("/api/v1.0/blogsite/user/register")
                || path.startsWith("/api/v1.0/blogsite/user/login")
                || path.startsWith("/api/v1.0/blogsite/user/refresh")
                || path.startsWith("/api/v1.0/blogsite/blogs/")
                || path.startsWith("/v3/api-docs")
                || path.startsWith("/swagger-ui");
    }

    private boolean isAdminOnlyPath(String path) {
        return path.startsWith("/api/v1.0/blogsite/category/create");
    }

    @Override
    public int getOrder() {
        return -1;
    }
}
