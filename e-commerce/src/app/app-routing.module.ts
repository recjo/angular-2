import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { OrderComponent } from './order/order.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { AddressComponent } from './address/address.component';
import { CategoriesComponent } from './categories/categories.component';
import { ContactComponent } from './contact/contact.component';
import { FaqsComponent } from './faqs/faqs.component';
import { PoliciesComponent } from './policies/policies.component';
import { ProductComponent } from './product/product.component';
import { ProductsListComponent } from './products-list/products-list.component';

@NgModule({
  imports: [
      RouterModule.forRoot([
        { path: 'order/:id', component: OrderComponent },
        { path: 'payment', component: PaymentComponent },
        { path: 'cart', component: CartComponent },
        { path: 'address', component: AddressComponent },
        { path: 'shop', component: CategoriesComponent }, //not needed?
        { path: 'categories', component: CategoriesComponent }, //not needed?
        { path: 'products/:id', component: ProductsListComponent },
        { path: 'product/:id', component: ProductComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'faqs', component: FaqsComponent },
        { path: 'policies', component: PoliciesComponent },
        { path: '' , component: HomeComponent},
        { path: '**' , component: ErrorComponent }
      ]),
    CommonModule,
    FormsModule
  ],
  exports: [
      RouterModule
  ],
  declarations: [
    ProductComponent,
    ProductsListComponent
  ]
})
export class AppRoutingModule { }
