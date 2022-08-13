/***************************
* WEB422 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Chirag Mudgil ID: 154693204 Date: 24 Jul 2022
*
****************************/

import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: Array<any> = []
  private fSubscription: any
  private dfSubscription: any

  removeFromFavourites(id: any){
    this.dfSubscription = this.data.removeFromFavourites(id);
    this.retrieve();
  }
  retrieve(){
    this.fSubscription = this.data.getFavourites().subscribe(data => {
    this.favourites = data.tracks
  })
 }
  constructor(private data: MusicDataService) { }
  ngOnInit(): void {
    this.retrieve();
  }
}
