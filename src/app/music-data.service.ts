/***************************
* WEB422 – Assignment 05
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this
* assignment has been copied manually or electronically from any other source (including web sites) or
* distributed to other students.
*
* Name: Chirag Mudgil ID: 154693204 Date: 24 Jul 2022
*
****************************/
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

  favourites: Array<any> = []

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) { }  

  getNewReleases(): Observable<SpotifyApi.ListOfNewReleasesResponse> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

   getArtistById(id: any): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id: any): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    let queryParams = {   include_groups: "album,single",   limit : 50   }
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(`https://api.spotify.com/v1/artists/${id}/albums`, { headers: { "Authorization": `Bearer ${token}` }, params: queryParams });
    }));
  }
  
  getAlbumById(id: any): Observable<SpotifyApi.ListOfNewReleasesResponse> {
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}`} });
    }));
  }

  searchArtists(searchString:string):Observable<SpotifyApi.ArtistSearchResponse>{
    let queryParams = { q: searchString, type: "artist", limit: "50"  }
     return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
       return this.http.get<SpotifyApi.ArtistSearchResponse>("https://api.spotify.com/v1/search", { headers: { "Authorization": `Bearer ${token}` }, params: queryParams });
     }));  
   }

  removeFromFavourites(id: any): Observable<any>{
    for (let i = 0; i < this.favourites.length; i++) {
         if(this.favourites[i] === id ){this.favourites.splice(i,1) }
    }
    return this.getFavourites();
  }

  addToFavourites(id:any){
    if(this.favourites.length<= 50){
      this.favourites.push(id)
      return true;
    }
    else return false;
  }

  getFavourites(): Observable<any>{
    let queryParams = {  ids: this.favourites.join(),  }
        if(this.favourites.length > 0){
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<SpotifyApi.ListOfNewReleasesResponse>(`https://api.spotify.com/v1/tracks`, { headers: { "Authorization": `Bearer ${token}` }, params: queryParams});
      }));
    }else{
      return new Observable(o=>{o.next([])});
    }
  }
}