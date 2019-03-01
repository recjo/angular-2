import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Product } from '../product/product';
import * as firebase from 'firebase'

@Component({
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit {
  categoryName: string;
  categoryId: string;
  products: Product[];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.categoryId = this.route.snapshot.params['id'];
    this.getProducts(this.categoryId);
    this.getCategoryName(this.categoryId);
  }

  getCategoryName(id: string){
    let dbRef = firebase.database().ref('categories');
    dbRef.orderByChild('id')
      .equalTo(id)
      .once('value')
      .then((snapshot)=>{
        let tmp = snapshot.val();
        let transform = Object.keys(tmp).map(key => tmp[key]);
        this.categoryName = transform[0].name;
      });  
  };
  
  getProducts(catId: string){
   let dbRef = firebase.database().ref('products/')
   dbRef.orderByChild('catId')
     .equalTo(catId)
     .once('value')
     .then((snapshot)=> {
       let tmp: string[] = snapshot.val();
       this.products = Object.keys(tmp).map(key => tmp[key])
     });
  }
  
  goProductDetail(prod: Product) {
    this.router.navigate(['/product', prod.id]);
  }
  
}
