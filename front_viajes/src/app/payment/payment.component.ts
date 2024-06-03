import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StripeElements, StripeCardElement, StripeCardElementOptions, Stripe } from '@stripe/stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentService } from '../_servicio/payment-service.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  paymentForm: FormGroup;
  elements: StripeElements | null = null ;
  card: StripeCardElement | null = null;
  stripe: Stripe | null = null;
  clientSecret: string ='';

  constructor(private paymentService: PaymentService, private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      amount: ['']
    });
  }

  async ngOnInit() {
    this.stripe = await loadStripe('pk_test_51PM5FeRvfQwpBftnSmANSdvNfNEq73nbidnLsSadel1mtZVeIG4lDldegGPWBT4k2tf4CwEc2S3YecCVwBCiCdzs00GXjBBqbO');
    if (this.stripe) {
      this.elements = this.stripe.elements();
      const cardStyle = {
        style: {
          base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        }
      };

      this.card = this.elements.create('card', cardStyle);
      this.card.mount('#card-element');
    } else {
      console.error('Stripe failed to initialize.');
    }
  }

  async submitPayment() {
    const amount = this.paymentForm.get('amount')?.value;
    if (amount) {
      this.paymentService.createPaymentIntent(amount).subscribe(async (data) => {
        this.clientSecret = data.clientSecret;
        if (this.stripe && this.card) {
          const result = await this.stripe.confirmCardPayment(this.clientSecret, {
            payment_method: {
              card: this.card,
            },
          });
  
          if (result.error) {
            console.error(result.error.message);
          } else {
            if (result.paymentIntent.status === 'succeeded') {
              console.log('Payment successful!');
            }
          }
        } else {
          console.error('Stripe or card is not initialized.');
        }
      }, error => {
        console.error('Error creating payment intent:', error);
      });
    } else {
      console.error('Amount is not defined.');
    }
  }
}
