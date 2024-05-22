package com.softtek.Servicio.servicioCliente.impl;


import com.softtek.DAO.request.SignInRequest;
import com.softtek.DAO.request.SignUpRequest;
import com.softtek.DAO.response.JwtAuthenticationResponse;
import com.softtek.Modelo.Cliente;
import com.softtek.Modelo.Role;
import com.softtek.Repositorio.IClientesRepo;
import com.softtek.Servicio.servicioCliente.AuthenticationService;
import com.softtek.Servicio.servicioCliente.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final IClientesRepo userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    @Override
    public JwtAuthenticationResponse signup(SignUpRequest request) {
        var user = Cliente.builder()
                .nombre(request.getFirstName())

                .email(request.getEmail()).password(passwordEncoder.encode(request.getPassword()))

                .role(Role.USER).build();
        userRepository.save(user);
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }

    @Override
    public JwtAuthenticationResponse signin(SignInRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
        var jwt = jwtService.generateToken(user);
        return JwtAuthenticationResponse.builder().token(jwt).build();
    }
}


