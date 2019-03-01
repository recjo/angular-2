import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Faq } from './faq';

@Component({
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css']
})

export class FaqsComponent implements OnInit {
  title:string = 'FAQs';
  faqs: Faq[];

  constructor() { }

  ngOnInit() {
    //this.seedDatabase();
    this.getFaqs();
  }
  
  getFaqs(){
   let dbRef = firebase.database().ref('faqs')
   dbRef.orderByChild('sortOrder')
     .once('value')
     .then((snapshot)=> {
       let tmp: string[] = snapshot.val();
       this.faqs = Object.keys(tmp).map(key => tmp[key])
     });
  }

  seedDatabase() {
    let dbRef = firebase.database().ref('faqs/');
    let newRecord = dbRef.push();
    newRecord.set ({
      question: "When will my order be shipped? When will it arrive?",
      answer: "If your order was placed Monday thru Thursday it will be shipped the same day or the day after. If your order was placed on Friday prior to 3:00pm PST, the order may be shipped the same day, if not it will be shipped on Monday. You will receive an e-mail confirmation once your order has shipped. Prior to checking out, you will see several estimated arrival dates, depending on the type of shipping you select.",
      sortOrder: 10,
      active: true,
      id: newRecord.key
    });
    //
    newRecord = dbRef.push();
    newRecord.set ({
      question: "Will my credit card be charged immediately?",
      answer: "No. Your credit card will not be charged until your order is shipped. When you enter your credit card information on the final review page, we'll give you an order confirmation number. You will also immediately receive an e-mail confirming that your order has been received. We will send you another e-mail to notify you when your order has been shipped and we've charged your credit card.",
      sortOrder: 20,
      active: true,
      id: newRecord.key
    });
    //
    newRecord = dbRef.push();
    newRecord.set ({
      question: "Are purchases on this website really tax free?",
      answer: "We collect sales tax only in states where we have a physical presence. Currently, sales tax only applies to the states of Arizona, California, Florida, Georgia, Hawaii, Illinois, Massachusetts, North Carolina, New Jersey, Nevada, New York, Pennsylvania, Tennessee, Texas, Virginia, and Washington.",
      sortOrder: 30,
      active: true,
      id: newRecord.key
    });
  }
}
