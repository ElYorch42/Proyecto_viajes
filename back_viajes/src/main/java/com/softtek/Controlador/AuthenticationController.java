package com.softtek.Controlador;

import com.softtek.DAO.request.SignInRequest;
import com.softtek.DAO.request.SignUpRequest;
import com.softtek.DAO.response.JwtAuthenticationResponse;
import com.softtek.Servicio.servicioCliente.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@CrossOrigin(origins="http://localhost:4200")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity<JwtAuthenticationResponse> signup(@RequestBody SignUpRequest request) {
        return ResponseEntity.ok(authenticationService.signup(request));
    }

    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SignInRequest request) {
        return ResponseEntity.ok(authenticationService.signin(request));
    }

    @PostMapping("/update")
    public ResponseEntity<JwtAuthenticationResponse> update(@RequestBody SignInRequest request, @RequestParam(name = "newPassword") String newPassword) {
        return ResponseEntity.ok(authenticationService.updatePassword(request, newPassword));
    }

}
