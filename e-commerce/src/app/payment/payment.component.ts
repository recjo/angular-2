import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AddressService } from '../address/address.service';
import { OrderService } from '../order/order.service';
import { CartService } from '../cart/cart.service';
import { ShipMethods } from './shipMethods';
import { ExpMonths } from './expMonths';
import { ExpYears } from './expYears';
import { Order } from '../order/order';

@Component({
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css', '../cart/cart.component.css']
})

export class PaymentComponent implements OnInit {
  title: string = "Payment";
  addressId: string;
  cartId: string;
  creditCardNumber: string;
  creditCardCcv: string;
  creditCardExpMo: string;
  creditCardExpYear: string;
  shipTotal: string;
  cartTotal: number;
  taxTotal: number;
  grandTotal: number;
  billing: any;
  shipping: any;
  cart: any;
  shipMethods: any[];
  expMonths: any[];
  expYears: any[];

  constructor(private router: Router, private addressService: AddressService, private cartService: CartService, private orderService: OrderService) { }

  ngOnInit() {
    this.shipMethods = new ShipMethods().services;
    this.expMonths = new ExpMonths().months;
    this.expYears = new ExpYears().years;
    this.addressService.getAddress("billing").then(addy => this.billing = addy);
    this.addressService.getAddress("shipping").then(addy => this.shipping = addy);
    this.cartService.getCart()
        .then(theCart => this.cart = theCart)
        .then(xcart => this.cartService.sumCart(xcart))
        .then(sum => {
          this.cartTotal = sum;
          this.shipTotal = this.shipMethods[0].value;
          this.calcTotals();
        });
  }

  calcTotals() {
    this.taxTotal = (this.cartTotal * 0.095);
    this.grandTotal = this.cartTotal + this.taxTotal + Number(this.shipTotal);
  }

  submitOrder(shipIndex: number) {
    let order = new Order(
      this.shipMethods[shipIndex].name,
      this.grandTotal,
      this.cartTotal,
      this.taxTotal,
      Number(this.shipTotal),
      this.creditCardNumber.toString().substring(this.creditCardNumber.toString().length - 4, this.creditCardNumber.toString().length),
      this.creditCardExpMo + '/' + this.creditCardExpYear,
      this.creditCardCcv,
      this.billing,
      this.shipping,
      this.cart
    );
    let orderId = this.orderService.addOrder(order);
    this.router.navigate(['/order', orderId]);
  }

}
