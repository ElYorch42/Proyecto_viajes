package com.softtek.Servicio.servicioCliente;

import com.softtek.DAO.request.SignInRequest;
import com.softtek.DAO.request.SignUpRequest;
import com.softtek.DAO.response.JwtAuthenticationResponse;


public interface AuthenticationService {
    JwtAuthenticationResponse signup(SignUpRequest request);

    JwtAuthenticationResponse signin(SignInRequest request);

}

