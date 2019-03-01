import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  title: string = 'Order Details';
  orderNumber: string;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.orderNumber = this.route.snapshot.params['id'];
  }

  goShop() {
    this.router.navigate(['/shop']);
  }

}
