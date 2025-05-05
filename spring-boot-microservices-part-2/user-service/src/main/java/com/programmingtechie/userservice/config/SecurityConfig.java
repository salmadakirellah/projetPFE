package com.example.userservice.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
            .authorizeRequests()
            .antMatchers("/auth/**").permitAll() // Autoriser l'accès aux endpoints /auth
            .antMatchers("/admin/**").permitAll()  // Accès aux endpoints /admin seulement pour les ADMIN
            .antMatchers("/chauffeur/**").hasRole("CHAUFFEUR") // Accès aux endpoints /chauffeur seulement pour les CHAUFFEUR
            .antMatchers("/client/**").hasRole("CLIENT") // Accès aux endpoints /client seulement pour les CLIENT
            .anyRequest().authenticated(); // Toutes les autres demandes doivent être authentifiées
        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
