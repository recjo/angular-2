import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { PageContent } from './pageContent';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pageContent: PageContent;

  constructor() { }

  ngOnInit() {
    this.getContent("Home");
    //this.seedDatabase();
  }

  getContent(pageKeyName: string){
    let dbRef = firebase.database().ref('pageContent');
    dbRef.orderByChild('pageKey')
      .equalTo(pageKeyName)
      .once('value')
      .then((snapshot)=>{
        let tmp = snapshot.val();
        let transform = Object.keys(tmp).map(key => tmp[key]);
        let pageKey = transform[0].pageKey;
        let pageText = transform[0].pageText;
        let pageTitle = transform[0].pageTitle;
        let linkName = transform[0].linkName;
        let id = transform[0].id;
        this.pageContent = new PageContent(pageKey, pageText, pageTitle, linkName, id);
      });
  };

  /*seedDatabase() {
    //let pageContent = { id: null, pageKey: "Terms", pageTitle: "Terms & Policies", pageText: "<h2>Privacy Policy</h2><P>We don't sell or give away your email address, or any other personal information, ever! Periodically, (almost never) we might send you an email with specials but it will contain an opt-out link to be removed from our list. That complies with the CAN-SPAM act.</P><h2>Return Policy</h2><P>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis mi nulla, viverra pellentesque nunc. Praesent vel nibh ligula. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget enim magna, non posuere mauris. Vivamus eget libero turpis, nec adipiscing tortor. Nulla vulputate, odio eget ornare aliquet, enim mauris elementum neque, ut iaculis tortor magna quis urna. Donec ante enim, auctor quis feugiat nec, fringilla ut tellus. Sed porttitor dapibus posuere. Donec eu iaculis nibh.</P>" }
    //firebase.database().ref('pageContent').push(pageContent);
    let text = "<p>Please email us at store@store.com or call 555-555-5555. Phasellus ullamcorper, ligula sit amet sollicitudin venenatis, ligula odio placerat mauris, eu luctus nisi diam ut ligula. Nullam bibendum feugiat leo, non tristique felis faucibus at. Duis nulla nisl, varius ac mollis a, faucibus rutrum nulla. Aenean at mauris nunc. Ut eu tellus tempor leo tempor ultrices a vel neque. Ut hendrerit leo vulputate lacus convallis interdum. Etiam tincidunt nisi id tortor elementum at tincidunt neque mattis. Curabitur pellentesque risus nec eros rutrum convallis.<br /><br />Aliquam malesuada massa nec ligula sodales faucibus. Aliquam mattis aliquet augue, ac commodo ipsum interdum varius. Vivamus neque purus, aliquet a ullamcorper eu, euismod sit amet lectus. Vivamus ac ligula eget orci ornare auctor vel eu diam.</p>";
    let dbRef = firebase.database().ref('pageContent/');
    let newRecord = dbRef.push();
    newRecord.set ({
      pageKey: "ContactUs",
      linkName: "Contact Us",
      pageTitle: "Contact Us",
      pageText: text,
      id: newRecord.key
    });
  }*/

}