package com.programmingtechie.service_

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
public class JwtUtil {

    // Generate a secure key for signing
    private static final SecretKey SIGNING_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);


    public static Claims getClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(SIGNING_KEY)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public static boolean isTokenValid(String token) {
        return !isExpired(token);
    }

    private static boolean isExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    public static String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if ((authentication instanceof AnonymousAuthenticationToken)) {
            throw new RuntimeException("Anonymous user");
        }
        return authentication.getName();
    }
}