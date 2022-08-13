import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';
import jwt_decode from "jwt-decode";

import User from './User';
import RegisterUser from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( private http: HttpClient) { }

  public getToken(): string | null {  return localStorage.getItem('access_token');  }

  public setToken(token: string): void{ localStorage.setItem('access_token', token);  }

  public readToken(): User | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      return jwt_decode(token);
    } else {
      return null;
    }
  }
  public isAuthenticated(): boolean { 
    const token = localStorage.getItem('access_token');
    if (token) {
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user: User): Observable<any> {
    environment.userAPIBase
    return this.http.post<any>(environment.userAPIBase + `api/user/login`, user);  }

  logout(){    localStorage.removeItem('access_token'); }
  register(registerUser: any): Observable<any> {   return this.http.post<any>(environment.userAPIBase+`api/user/register`,registerUser);  }

}
