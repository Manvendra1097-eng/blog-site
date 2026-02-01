package com.blogsite.gateway.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebExceptionHandler;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.Map;

/**
 * Simplified reactive error handler for API Gateway.
 * In reactive Spring (WebFlux/Gateway), we can't use @RestControllerAdvice
 * because there are no @RestController endpoints - it's all functional routing.
 */
@Component
@Order(-2)
public class GlobalErrorWebExceptionHandler implements WebExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalErrorWebExceptionHandler.class);

    @Override
    public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {
        logger.error("Gateway error: {}", ex.getMessage(), ex);

        // Determine status code
        HttpStatus status = determineHttpStatus(ex);

        // Create error response
        Map<String, Object> errorResponse = Map.of(
            "timestamp", Instant.now().toString(),
            "status", status.value(),
            "error", status.getReasonPhrase(),
            "message", getErrorMessage(ex),
            "path", exchange.getRequest().getPath().value()
        );

        exchange.getResponse().setStatusCode(status);
        exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);

        return exchange.getResponse()
                .writeWith(Mono.just(exchange.getResponse()
                        .bufferFactory()
                        .wrap(errorResponse.toString().getBytes())));
    }

    private HttpStatus determineHttpStatus(Throwable ex) {
        String message = ex.getMessage();
        if (message != null) {
            if (message.contains("JWT") || message.contains("token")) {
                return HttpStatus.UNAUTHORIZED;
            }
            if (message.contains("Connection refused") || message.contains("unavailable")) {
                return HttpStatus.SERVICE_UNAVAILABLE;
            }
        }
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }

    private String getErrorMessage(Throwable ex) {
        String message = ex.getMessage();
        if (message != null) {
            if (message.contains("Connection refused")) {
                return "Service temporarily unavailable";
            }
            if (message.contains("JWT")) {
                return "Invalid or expired token";
            }
        }
        return "An error occurred processing your request";
    }
}
