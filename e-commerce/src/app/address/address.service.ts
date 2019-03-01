import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { v4 as uuid } from 'uuid';

import { Address } from './address';
import { Countries } from './countries';
import { States } from './states';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  addressId: string;

  constructor() {
    this.addressId = sessionStorage.getItem('addressId');
    if (!this.addressId) {
      this.addressId = uuid();
      sessionStorage.setItem('addressId', this.addressId);
    }
  }

  getCountries() {
    return new Countries().countries;
  }

  getStates() {
    return new States().states;
  }

  getBlankAddress(type: string) {
    return new Address(this.addressId, type, "", "", "", "", "", "", "", "", "", "", "");
  }

  initBilling() {
    return new Address(this.addressId, "billing", "Fred", "Jones", "123 Main St.", "Apt 6", "Long Beach", "CA", "90808", "US", "555-111-2222", "test@domain.com", "");
  }

  copyAddress(address: Address) {
    return new Address(
      this.addressId,
      "shipping",
      address.firstName,
      address.lastName,
      address.address1,
      address.address2,
      address.city,
      address.state,
      address.postalCode,
      address.country,
      "",
      "",
      ""
    );
  }

  getAddress(type: string) {
    return Promise.resolve(firebase.database().ref('addresses')
      .orderByChild('addressId')
      .equalTo(this.addressId)
      .once('value')
      .then((snapshot)=>{
        let tmp = snapshot.val();
        let transform = Object.keys(tmp).map(key => tmp[key]);
        for (var ii = 0; ii < transform.length; ii++) {
          if (transform[ii].addressType == type) {
            return new Address(
              transform[ii].addressId,
              transform[ii].addressType,
              transform[ii].firstName,
              transform[ii].lastName,
              transform[ii].address1,
              transform[ii].address2,
              transform[ii].city,
              transform[ii].state,
              transform[ii].postalCode,
              transform[ii].country,
              transform[ii].phone,
              transform[ii].email,
              transform[ii].id
            );
          }
        }
        return this.getBlankAddress(type);
      }));
  }

  addAddress(address: Address) {
    let dbRef = firebase.database().ref('addresses');
    let newRecord = dbRef.push();
    newRecord.update ({
      addressId: address.addressId,
      addressType: address.addressType,
      firstName: address.firstName,
      lastName: address.lastName,
      address1: address.address1,
      address2: address.address2,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone,
      email: address.email,
      id: newRecord.key
    });
  }
}
