import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private purchaseUrl = 'http://localhost:8080/api/checkout/purchase';
  constructor(private httpCliente: HttpClient) {}

  placeOrder(purchase: Purchase) {
    return this.httpCliente.post<Purchase>(this.purchaseUrl, purchase);
  }
}
