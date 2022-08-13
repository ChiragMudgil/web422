/*********************************************************************************
* WEB422 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of
this
* Assignment has been copied manually or electronically from any other source (including web sites) or
* Distributed to other students.
*
* Name: ___Chirag Mudgil___ Student ID: ______154693204________ Date: ______11/August/2022__________
*
* Angular App (Deployed) Link: ____________________________
*
* User API (Heroku) Link: __________https://infinite-gorge-43545.herokuapp.com/_______________
*
********************************************************************************/ 

import { Component } from '@angular/core';
import { Router, Event, NavigationStart } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  searchString: String = "";
  title = 'Web422';
  token: any;

  constructor( private router: Router,private auth: AuthService ){}

  Search(queryParams: any){
    this.router.navigate(['/search'], { queryParams: { q: queryParams } });
    this.searchString = ""
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { this.token = this.auth.readToken(); }
    });
  }

  logout(){
    localStorage.clear();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}

