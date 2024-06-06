package com.softtek.Controlador;

import com.softtek.Modelo.EmailRequest;
import com.softtek.Servicio.EmailService;
import jakarta.mail.MessagingException;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/email")
@CrossOrigin(origins = "http://localhost:4200")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/contacto")
    public void sendEmailContacto(@RequestBody EmailRequest emailRequest) throws MessagingException {
        emailService.enviarCorreoContacto(emailRequest.getTo(),emailRequest.getSubject(),emailRequest.getText(),emailRequest.getName());
    }
    @PostMapping("/registrarse")
    public void sendEmailRegistro(@RequestBody EmailRequest emailRequest) throws MessagingException {
        emailService.enviarCorreoRegistro(emailRequest.getTo(),emailRequest.getSubject(),emailRequest.getText(),emailRequest.getName());
    }

    @PostMapping("/reset")
    public void sendEmailRecuperar(@RequestBody EmailRequest emailRequest) throws MessagingException {
        emailService.enviarCorreoReset(emailRequest.getTo(),emailRequest.getSubject(),emailRequest.getText(),emailRequest.getName());
    }
}