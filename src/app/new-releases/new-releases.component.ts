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
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {
  releases: any =  {}
  private MusicSubscription:any
  constructor(private data: MusicDataService) { }
  ngOnInit(): void {
    this.MusicSubscription= this.data.getNewReleases().subscribe(data => this.releases = data);
  }
}
