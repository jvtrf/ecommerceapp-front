import { CartItem } from './cart-item';

export class OrderItem {
  imageUrl: string;
  unitPirce: number;
  quantity: number;
  productId: string;

  constructor(cartItem: CartItem) {
    this.imageUrl = cartItem.imageUrl;
    this.unitPirce = cartItem.unitPrice;
    this.quantity = cartItem.quantity;
    this.productId = cartItem.id;
  }
}
