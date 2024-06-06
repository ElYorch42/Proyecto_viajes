package com.softtek.Controlador;

import com.softtek.Modelo.PaymentRequest;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "http://localhost:4200")
public class PaymentController {
    @Autowired
    public PaymentController() {
        Stripe.apiKey = "sk_test_51PM5FeRvfQwpBftnH1bx5mZw5dd0ne0OiUlkcfJKALhwbBQYFdaMEKQzoN66uNKHTMEy9IT9a9fJ2zeARXGHDFGY00JDbEvhuX"; // Cambia esto por tu clave secreta real
    }

    @PostMapping("/create-payment-intent")
    public Map<String, String> createPaymentIntent(@RequestBody Map<String, Object> data) throws Exception {
        int amount = (int) data.get("amount");

        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) amount)
                .setCurrency("eur")
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        Map<String, String> responseData = new HashMap<>();
        responseData.put("clientSecret", intent.getClientSecret());

        return responseData;
    }
}
