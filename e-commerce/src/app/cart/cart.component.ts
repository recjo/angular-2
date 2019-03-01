import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CartService } from './cart.service';
import { Cart } from './cart';

@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css', '../app.component.css']
})

export class CartComponent implements OnInit {
  title: string = 'Cart';
  cartTotal: number;
  cart: Cart[];

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    //getCart is promised-based, so u can chain success methods to handle returned cart
    this.cartService.getCart()
        .then(theCart => this.cart = theCart)
        .then(xcart => this.cartService.sumCart(xcart))
        .then(sum => this.cartTotal = sum);
  }

  removeItem(id: string) {
    let verify = confirm('Are you sure you want to delete this item?');
    if (verify == true) {
      this.cartService.removeCart(id);
      this.getCart();
    }
  }

  goToProduct(productId: string) {
    this.router.navigate(['/product', productId]);
  }

  goToAddress() {
    this.router.navigate(['/address']);
  }

}
