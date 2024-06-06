package com.softtek.Servicio;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void enviarCorreoContacto(String to, String subject, String text,String nombre) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setCc("viajesalodesconocido@gmail.com");

        Context context = new Context();
        context.setVariable("nombre", nombre);
        context.setVariable("texto", text);
        String content = templateEngine.process("Contacto.html", context);
        helper.setText(content, true);

        javaMailSender.send(message);
    }
    public void enviarCorreoRegistro(String to, String subject, String text,String nombre) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setCc("viajesalodesconocido@gmail.com");

        Context context = new Context();
        context.setVariable("nombre", nombre);
        context.setVariable("email", to);
        String content = templateEngine.process("Bienvenida.html", context);
        helper.setText(content, true);

        javaMailSender.send(message);
    }

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setCc("viajesalodesconocido@gmail.com");
        message.setSubject(subject);
        message.setText(text);
        message.setFrom("viajesalodesconocido@gmail.com");

        mailSender.send(message);
    }

    public void enviarCorreoConfirmacion(String to, String subject, String name) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setCc("viajesalodesconocido@gmail.com");

        Context context = new Context();
        context.setVariable("nombre", name);
        String content = templateEngine.process("Gracias.html", context);
        helper.setText(content, true);

        javaMailSender.send(message);
    }
}
