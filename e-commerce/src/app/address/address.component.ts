import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddressService } from './address.service';

@Component({
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})

export class AddressComponent implements OnInit {
  title: string = 'Billing and Shipping Address';
  billing: any;
  shipping:  any;
  countries: any[];
  states: any[];

  constructor(private router: Router, private addressService: AddressService) { }

  ngOnInit() {
    this.countries = this.addressService.getCountries();
    this.states = this.addressService.getStates();
    this.billing = this.addressService.initBilling();
    this.shipping = this.addressService.getBlankAddress("shipping");
  }

  onSubmit() {
    this.addressService.addAddress(this.billing);
    if (!this.shipping.address1) {
      this.shipping = this.addressService.copyAddress(this.billing);
    }
    this.addressService.addAddress(this.shipping);
    this.router.navigate(['/payment']);
  }

  copyAddress(e) {
    if(e.target.checked) {
      this.shipping.firstName = this.billing.firstName;
      this.shipping.lastName = this.billing.lastName;
      this.shipping.address1 = this.billing.address1;
      this.shipping.address2 = this.billing.address2;
      this.shipping.city = this.billing.city;
      this.shipping.state = this.billing.state;
      this.shipping.postalCode = this.billing.postalCode;
      this.shipping.country = this.billing.country;
    }
    else {
      this.shipping = this.addressService.getBlankAddress("shipping");
    }
  }

}
