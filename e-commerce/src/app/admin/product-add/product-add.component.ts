import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { Product } from '../../product/product';
import { UserService } from '../user.service';

@Component({
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css', '../admin.component.css']
})
export class ProductAddComponent {
    imgTitle: string;
    imageSRC: string;
    name: string;
    description: string;
    catId: string;
    price: number;
    sku: string;
    itemWeight: number;
    active: boolean;
    sizeName: string;
    colorName: string;
    product: Product;

  constructor(private router: Router, private userSVC: UserService) { }

  createProduct(){
      this.product = new Product ( 
          this.name, 
          this.description,
          this.catId, 
          this.imgTitle, 
          this.imageSRC.substring(23),
          this.price,
          this.sku,
          this.itemWeight,
          this.active,
          this.sizeName,
          this.colorName
      );
      this.postProduct(this.product);
      alert(`${this.name} added product`);
      this.router.navigate(['/shop']);
  }

  postProduct(prod: Product){
    let storageRef = firebase.storage().ref();
    storageRef.child(`product_images/${prod.imgTitle}`).putString(prod.img, 'base64')
        .then((snapshot) => {
            return snapshot.ref.getDownloadURL(); // will return a promise with the download link
        })
        .then(downloadURL => {
            return downloadURL; //what a pain. now send url to database insert.
        })
        .then(url => {
            //insert product (with image url)
            let dbRef = firebase.database().ref('products/');
            let newProd = dbRef.push();
            newProd.set ({
                name: prod.name,
                desc: prod.description,
                catId: prod.catId,
                imgTitle: prod.imgTitle,
                img: url,
                price: prod.price,
                id: newProd.key
            });
            alert(`${this.name} added product`);
        })
        .catch ((error)=>{
            alert(`failed upload: ${error}`);
        });
  }

  fileLoad($event: any) {
      let myReader:FileReader = new FileReader();
      let file:File = $event.target.files[0];
      this.imgTitle = file.name; 
      myReader.readAsDataURL(file);

      myReader.onload = (e: any) => {
          this.imageSRC = e.target.result;
      }

  }

  cancel(){
      this.router.navigate(['/shop']);
  }

}
