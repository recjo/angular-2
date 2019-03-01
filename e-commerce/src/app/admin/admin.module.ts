import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { AdminComponent } from './admin.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';

const AdminRoutes: Routes = [
    { 
        path: 'admin',  
        component: AdminComponent, 
        children: [
          { path: 'product/add', component: ProductAddComponent, canActivate: [UserService] },
          { path: 'login', component: LoginComponent }
        ]
    },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(AdminRoutes)
  ],
  exports: [
      RouterModule
  ],
  declarations: [
    AdminComponent,
    ProductAddComponent,
    LoginComponent
  ],
  providers: [
    UserService
  ]
})
export class AdminModule { }
