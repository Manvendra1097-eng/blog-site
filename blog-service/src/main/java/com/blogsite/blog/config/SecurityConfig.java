package com.blogsite.blog.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        private final GatewayAuthenticationFilter gatewayAuthenticationFilter;

        public SecurityConfig(GatewayAuthenticationFilter gatewayAuthenticationFilter) {
                this.gatewayAuthenticationFilter = gatewayAuthenticationFilter;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http
                        .csrf(csrf -> csrf.disable())
                        .headers(headers -> headers
                                .contentTypeOptions(contentType -> {})
                                .frameOptions(frame -> frame.deny())
                                .xssProtection(xss -> {})
                        )
                        .addFilterBefore(gatewayAuthenticationFilter, org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter.class)
                        .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/api/v1.0/blogsite/blogs/**").permitAll()
                                .requestMatchers("/api/v1.0/blogsite/categories").permitAll()
                                .anyRequest().authenticated()
                        );
                return http.build();
        }
}
