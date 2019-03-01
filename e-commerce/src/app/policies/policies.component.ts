import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { PageContent } from '../home/pageContent';

@Component({
  templateUrl: './policies.component.html',
  styleUrls: ['./policies.component.css']
})
export class PoliciesComponent implements OnInit {
  pageContent: PageContent;

  constructor() { }

  ngOnInit() {
    this.getContent("Terms");
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

}
