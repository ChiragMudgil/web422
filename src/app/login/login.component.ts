import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user={userName: "", password: "", _id: ""}
  warning =""
  loading =false

  private AuthSubscription:any

  constructor(private data: AuthService, private router:Router) { }

  register(){    this.router.navigate(['/register']);  }

  ngOnInit(): void {}

  onSubmit(frm:NgForm):void{
    this.user = frm.value;
    this.AuthSubscription = this.data.login(this.user).subscribe(
      (success:any) => {
        this.loading = false;
        this.data.setToken(success.token); 
        this.router.navigate(['/newReleases']);
      },
      (e:any) => { this.warning = e.error; this.loading = false });
  }
}