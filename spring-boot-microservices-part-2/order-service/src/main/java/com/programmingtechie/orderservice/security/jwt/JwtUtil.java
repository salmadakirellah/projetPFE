package com.programmingtechie.orderservice.security.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
public class JwtUtil {

    private static final String SECRET = System.getenv("JWT_SECRET");
    private static final SecretKey SIGNING_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());


    public static boolean isTokenValid(String token) {
        try {
            Jwts.parser()
                    .verifyWith(SIGNING_KEY)
                    .build()
                    .parseSignedClaims(token);
            return !isExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            return false; // Invalid token
        }
    }

    // Extract all claims
    public static Claims getClaims(String token) {
        return Jwts.parser()
                .verifyWith(SIGNING_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    // Get username (subject)
    public static String getUsername(String token) {
        return getClaims(token).getSubject();
    }

    // Get user roles/authorities
    public static List<GrantedAuthority> getAuthorities(String token) {
        List<String> authorities = getClaims(token).get("authorities", List.class);
        return authorities.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    // Check expiration
    private static boolean isExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    // Get current user email (from Spring Security context)
    public static String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken) {
            throw new RuntimeException("Anonymous user");
        }
        return authentication.getName();
    }
}