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
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums: any ={}
  artist: any = {}

  private MSubscription:  any
  private ASubscription:  any

  constructor(private data: MusicDataService,  private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.MSubscription=this.data.getArtistById(this.route.snapshot.params['id']).subscribe(data => this.artist = data);
    this.ASubscription =this.data.getAlbumsByArtistId(this.route.snapshot.params['id']).subscribe(data => {
      this.albums = data
      this.albums.items=this.albums.items.filter((curValue: any, index: any, self: any) => self.findIndex((t: { name: any; }) => t.name.toUpperCase() === curValue.name.toUpperCase()) === index)
    })
   
  }
}
