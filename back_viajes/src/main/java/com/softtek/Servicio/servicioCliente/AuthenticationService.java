package com.softtek.Servicio.servicioCliente;

import com.softtek.DAO.request.SignInRequest;
import com.softtek.DAO.request.SignUpRequest;
import com.softtek.DAO.response.JwtAuthenticationResponse;


public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SignInRequest request);

    JwtAuthenticationResponse updatePassword1(String email, String newPassword);
    JwtAuthenticationResponse updatePassword(SignInRequest request, String newPassword);
    JwtAuthenticationResponse updatePassword1(String email, String newPassword);
}

