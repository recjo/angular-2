import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Category } from './category';
import * as firebase from 'firebase'

@Component({
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css', '../products-list/products-list.component.css']
})

export class CategoriesComponent implements OnInit {
  title:string = 'Shop';
  categories: Category[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }
  
  getCategories(){
   let dbRef = firebase.database().ref('categories/')
   dbRef.orderByChild('name')
     .once('value')
     .then((snapshot)=> {
       let tmp: string[] = snapshot.val();
       this.categories = Object.keys(tmp).map(key => tmp[key])
     });
  }
  
  goProductsList(category: Category) {
    this.router.navigate(['/products', category.id]);
  }

}
