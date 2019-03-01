import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }

  addOrder(order: Order) {
    let dbRef = firebase.database().ref('orders');
    let newRecord = dbRef.push();
    newRecord.set ({
      shipVia: order.shipVia,
      grandTotal: order.grandTotal,
      subTotal: order.subTotal,
      taxTotal: order.taxTotal,
      shipTotal: order.shipTotal,
      lastFour: order.lastFour,
      exp: order.exp,
      ccv: order.ccv,
      billing: order.billing,
      shipping: order.shipping,
      orderItems: order.orderItems,
      id: newRecord.key
    });
    return newRecord.key;
  }
}
