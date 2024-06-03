import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stripe, loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private stripe: Stripe | null = null;

  constructor(private http: HttpClient) {
    loadStripe('pk_test_51PM5FeRvfQwpBftnSmANSdvNfNEq73nbidnLsSadel1mtZVeIG4lDldegGPWBT4k2tf4CwEc2S3YecCVwBCiCdzs00GXjBBqbO').then((stripe) => {
      this.stripe = stripe;
    });
  }

  createPaymentIntent(amount: number) {
    return this.http.post<{ clientSecret: string }>('http://localhost:8080/api/payment/create-payment-intent', { amount });
  }

  async confirmPayment(clientSecret: string, cardElement: any) {
    if (!this.stripe) {
      throw new Error('Stripe has not been loaded yet.');
    }

    return await this.stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });
  }
}
