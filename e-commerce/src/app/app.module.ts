import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesComponent } from './categories/categories.component';
import { PoliciesComponent } from './policies/policies.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { AdminModule } from './admin/admin.module';
import { AddressComponent } from './address/address.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    PoliciesComponent,
    ContactComponent,
    FaqsComponent,
    CartComponent,
    HomeComponent,
    ErrorComponent,
    AddressComponent,
    PaymentComponent,
    OrderComponent
  ],
  imports: [
    BrowserModule,
    AdminModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
})
export class AppModule { }
