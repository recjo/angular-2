import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import * as firebase from 'firebase';
import { Product } from './product';
import { CartService } from '../cart/cart.service';

@Component({
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css', '../admin/admin.component.css']
})

export class ProductComponent implements OnInit {
  title: string = 'Product Details';
  quantity: number = 1;
  showCheckoutButton: boolean = false;
  product: Product;

  constructor(private route: ActivatedRoute, private router: Router, private cartService: CartService) { }

  ngOnInit(){
    let productId = this.route.snapshot.params['id'];
    this.getProduct(productId);
    //this.seedDatabase();
  }

  getProduct(id: string){
    let dbRef = firebase.database().ref('products');
    dbRef.orderByChild('id')
      .equalTo(id)
      .once('value')
      .then((snapshot)=>{
        let tmp = snapshot.val();
        let transform = Object.keys(tmp).map(key => tmp[key]);
        let name = transform[0].name;
        let desc = transform[0].desc;
        let imgTitle = transform[0].imgTitle;
        let img = transform[0].img;
        let price = transform[0].price;
        let id = transform[0].id;
        let catId = transform[0].catId;
        let sku = transform[0].sku;
        let itemWeight = transform[0].itemWeight;
        let active = transform[0].active;
        let sizeName = transform[0].sizeName;
        let colorName = transform[0].colorName;
        this.product = new Product(name, desc, catId, imgTitle, img, price, sku, itemWeight, active, sizeName, colorName, id);
      });
  };

  addProduct(product:Product){
    this.cartService.addProduct(product.id, this.quantity, product.name, product.price, product.sku, product.colorName, product.sizeName);
    this.showCheckoutButton = true;
  }

  checkout(){
    this.router.navigate(['/cart']);
  }

  /*
  seedDatabase() {
    let dbRef = firebase.database().ref('products/');
    let newRecord = dbRef.push();
    newRecord.set ({
      catId: "-JhQ7APk0UtyRTFO9-TS",
      sku: "TS001",
      name: "Short Sleeve Logo Shirt",
      desc: "<p>Donec condimentum cursus elit, at varius lectus condimentum eget. Vivamus nisi orci, fermentum non auctor auctor, ultricies ac nunc. Proin nec velit nunc, elementum placerat magna. Aenean tincidunt tellus sit amet elit gravida congue. Nam accumsan velit quis velit lacinia mollis. Proin felis purus, condimentum at tempus at, adipiscing eu neque. Proin ut velit eget nunc cursus vehicula sit amet vel nibh. Maecenas suscipit auctor urna, ut elementum ipsum elementum eu. Morbi ut quam pharetra velit ultrices ultricies.</p>",
      price: 11.99,
      itemWeight: 1,
      active: true,
      sizeName: "Small|Medium|Large",
      colorName: "Black",
      id: newRecord.key
    });
    //
    newRecord = dbRef.push();
    newRecord.set ({
      catId: "-JhQ7APk0UtyRTFO9-TS",
      sku: "TS002",
      name: "Ladies Logo Shirt",
      desc: "Ut ante augue, feugiat vel sollicitudin quis, congue nec ipsum. Ut sagittis mauris sit amet augue pharetra pharetra. Curabitur eu nulla ac ligula bibendum consequat ut in mi. Curabitur ac lorem nibh, id euismod dui. Fusce imperdiet risus id velit pellentesque quis tempor nibh pellentesque. Nulla consectetur, augue vitae pulvinar hendrerit, leo sapien consectetur massa, non imperdiet eros nunc vitae nibh.",
      price: 9.99,
      itemWeight: 1,
      active: true,
      sizeName: "Small|Medium|Large",
      colorName: "Black",
      id: newRecord.key
    });
    //
    newRecord = dbRef.push();
    newRecord.set ({
      catId: "-JhQ7APk0UtyRTFO9-TS",
      sku: "TS003",
      name: "Logo Polo Shirt",
      desc: "Donec sit amet est ac turpis pellentesque volutpat quis eu mauris. Integer blandit, erat in consequat consectetur, nisi nulla volutpat justo, ut scelerisque lorem velit eu justo. Etiam velit est, ornare sed elementum a, aliquam ut libero. Pellentesque in commodo elit. Mauris turpis nulla, commodo nec semper non, sagittis id sapien. Duis volutpat, neque sit amet vehicula blandit, nisi elit posuere ante, non gravida felis mauris vitae neque. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
      price: 7.99,
      itemWeight: 1,
      active: true,
      sizeName: "Small|Medium|Large",
      colorName: "Black",
      id: newRecord.key
    });
    //
    newRecord = dbRef.push();
    newRecord.set ({
      catId: "-JhLeOlGIEjaIOFHR0x",
      sku: "HT001",
      name: "Wreak Havoc Wool Beanie",
      desc: "<p>Donec sit amet est ac turpis pellentesque volutpat quis eu mauris. Integer blandit, erat in consequat consectetur, nisi nulla volutpat justo, ut scelerisque lorem velit eu justo. Etiam velit est, ornare sed elementum a, aliquam ut libero. Pellentesque in commodo elit. Mauris turpis nulla, commodo nec semper non, sagittis id sapien. Duis volutpat, neque sit amet vehicula blandit, nisi elit posuere ante, non gravida felis mauris vitae neque. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>",
      price: 15.99,
      itemWeight: 1,
      active: true,
      sizeName: "Adult",
      colorName: "Black",
      id: newRecord.key
    });
    //
    newRecord = dbRef.push();
    newRecord.set ({
      catId: "-JhQ76OEK_848CkIFhAq",
      sku: "HD001",
      name: "Wreak Havoc Hoodie",
      desc: "<p>Donec sit amet est ac turpis pellentesque volutpat quis eu mauris. Integer blandit, erat in consequat consectetur, nisi nulla volutpat justo, ut scelerisque lorem velit eu justo. Etiam velit est, ornare sed elementum a, aliquam ut libero. Pellentesque in commodo elit. Mauris turpis nulla, commodo nec semper non, sagittis id sapien. Duis volutpat, neque sit amet vehicula blandit, nisi elit posuere ante, non gravida felis mauris vitae neque. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.</p>",
      price: 21.00,
      itemWeight: 1,
      active: true,
      sizeName: "Small|Medium|Large",
      colorName: "Black|White",
      id: newRecord.key
    });
  }
  */
}
