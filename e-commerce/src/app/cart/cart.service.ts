import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { v4 as uuid } from 'uuid';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  cartId: string;

  constructor() {
    this.cartId = sessionStorage.getItem('cartId');
    if (!this.cartId) {
      this.cartId = "4156a241-41e5-465d-879a-dd61ad637005";
      //this.cartId = uuid();
      sessionStorage.setItem('cartId', this.cartId);
    }
  }

  getCartId() {
      return this.cartId;
  }

  getCart() {
    //promise because templates can load before cart contents is returned
    return Promise.resolve(firebase.database().ref('carts')
      .orderByChild('cartId')
      .equalTo(this.cartId)
      .once('value')
      .then((snapshot)=> {
        let tmp: string[] = snapshot.val();
        if (tmp) {
          return Object.keys(tmp).map(key => tmp[key]);
        }
        else {
          return [];
        }
      }));
  }

  //this is promise-based for chaining
  //reduce will cycle through array and apply method to each item (0 at end is optional starting value)
  sumCart(cart: any){
      return Promise.resolve(cart.reduce((total: number, item: any) => total + (item.price * item.qty), 0));
  }

  //add to cart
  addProduct(productId: string, qty: number, name: string, price: number, sku: string, colorName: string, sizeName: string) {
    let dbRef = firebase.database().ref('carts/');
    let newRecord = dbRef.push();
    newRecord.set ({
      cartId: this.cartId,
      productId: productId,
      qty: Number(qty),
      name: name,
      price: Number(price),
      sku: sku,
      sizeName: sizeName,
      colorName: colorName,
      id: newRecord.key
    });
  }

  removeCart(searchId: string) {
    let dbRef = firebase.database().ref('carts/').child(searchId).remove();
  }

  /*
  updateProduct(productId: string, qty: number, name: string, price: number, sku: string, colorName: string, sizeName: string) {
    //push turns numbers into a string, so cast them to Number
    let dbRef = firebase.database().ref('carts/').child(this.cartId)
      .update({
        productId: productId,
        qty: Number(qty),
        name: name,
        price: Number(price),
        sku: sku,
        sizeName: sizeName,
        colorName: colorName,
      });
  }*/

}
