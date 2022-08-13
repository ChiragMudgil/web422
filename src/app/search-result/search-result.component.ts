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
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})

export class SearchResultComponent implements OnInit {
  results : any = {}
  list: Array<any> = []
  private sSubscription:  any
  private aSubscription: any

  constructor(private data: MusicDataService, private route: ActivatedRoute ) { }

  getSearch(){
    this.aSubscription=this.data.searchArtists(this.searchQuery).subscribe(data =>{
      this.results = data
      this.list = this.results.artists.items
   });
  }
  searchQuery: string = this.route.snapshot.params['q'];
  ngOnInit(): void {
    this.results = {}
      this.sSubscription = this.route.queryParams.subscribe(params => {
        this.searchQuery = params['q'] ||"";
        this.getSearch();
     });
  }
  ngOnDestroy() {
    this.sSubscription.unsubscribe();
    this.aSubscription.unsubscribe();
  }
}
