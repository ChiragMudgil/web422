/***************************
* WEB422 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Chirag Mudgil ID: 154693204 Date: 24 Jul 2022
*
****************************/
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  album: any = {}
    private MSubscription:  any
  private FSubscription: any
  
  clickF = (trackId: any) => {
    this.FSubscription = this.favorite.addToFavourites(trackId)
    if(this.FSubscription){ this.snack.open("Adding to Favorites...    Done");
    }
  }

  constructor(private data: MusicDataService, private favorite :MusicDataService, private route: ActivatedRoute, private snack: MatSnackBar ) { }
  ngOnInit(): void {
    this.MSubscription=this.data.getAlbumById(this.route.snapshot.params['id']).subscribe(data => this.album = data)
  }
}
