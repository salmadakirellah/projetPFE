package org.example.backend_ais_platform.security;

import lombok.RequiredArgsConstructor;
import org.example.backend_ais_platform.exceptions.UserNotFoundException;
import org.example.backend_ais_platform.repository.UserRepository;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var member = userRepository.findByEmail(username).orElseThrow(() -> new UserNotFoundException("There is no user available with this email: "+username));
        return User.withUsername(member.getEmail()).password(member.getPassword()).roles(member.getRole().toString()).build();
    }
}
