package com.blogsite.blog.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Trusts X-User-* headers set by the API gateway after JWT validation.
 * Only the gateway should be able to set these headers.
 */
@Component
public class GatewayAuthenticationFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String userId = request.getHeader("X-User-Id");
        String userName = request.getHeader("X-User-Name");
        String roles = request.getHeader("X-User-Roles");

        if (userId != null && !userId.isEmpty()) {
            // Parse roles (comma-separated)
            Collection<SimpleGrantedAuthority> authorities = Collections.emptyList();
            if (roles != null && !roles.isEmpty()) {
                authorities = Arrays.stream(roles.split(","))
                        .map(String::trim)
                        .filter(r -> !r.isEmpty())
                        .map(r -> new SimpleGrantedAuthority("ROLE_" + r))
                        .collect(Collectors.toList());
            }

            // Store additional user info in details
            Map<String, String> details = new HashMap<>();
            details.put("userId", userId);
            details.put("userName", userName != null ? userName : "");

            // Use userId as principal, details map contains all user info
            UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(userId, null, authorities);
            auth.setDetails(details);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
        filterChain.doFilter(request, response);
    }
}
