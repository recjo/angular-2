import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Title} from '@angular/platform-browser';

import { Globals } from './globals';
import { Category } from './categories/category';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  storeName = Globals.STORENAME;
  copyright = Globals.COPYRIGHT;
  year = new Date().getFullYear();
  categories: Category[];

  public constructor(private titleService: Title, private router: Router) {
    // force route reload whenever params change;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    firebase.initializeApp({
      apiKey: "AIzaSyBoo8oi_uCiTMS_rGSp6bbiTTzim2oxY4g",
      authDomain: "gigabyte-42636.firebaseapp.com",
      databaseURL: "https://gigabyte-42636.firebaseio.com",
      storageBucket: "gigabyte-42636.appspot.com",
      messagingSenderId: "784729889072",
      projectId: "gigabyte-42636"
    })
  }

  ngOnInit(){
    this.getCategories();
  }
 
  getCategories(){
   let dbRef = firebase.database().ref('categories/')
   dbRef.once('value')
     .then((snapshot)=> {
       let tmp: string[] = snapshot.val();
       this.categories = Object.keys(tmp).map(key => tmp[key])
     });
  }
 
  goProductList(category: Category) {
   this.router.navigate(['/products', category.id]);
  }
 
  public setTitle( newTitle: string) {
    this.titleService.setTitle( newTitle );
  }
}
