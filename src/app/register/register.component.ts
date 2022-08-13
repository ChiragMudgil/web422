import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  public registerUser = { userName: "",  password: "",   password2: ""  }
  public warning = "";
  public  success = false;
  public loading = false;

  private AuthSubscription:any

  constructor(private data: AuthService,  private router:Router) { }

  button(){ this.router.navigate(['/login']); }

  ngOnInit(): void {  }

  onSubmit(f:NgForm):void{
    this.registerUser = f.value;
    if(this.registerUser.userName != "" && this.registerUser.password !="" && this.registerUser.password2!="" ){

      this.loading = true;

      this.AuthSubscription = this.data.register(this.registerUser).subscribe(data => {
        let response = data;  
          if(data ==="User registered successfully"){ 
          this.success = true;
          this.loading = false;
          this.warning = "";
        }
      },(e:any) => {
        this.warning = e.error;
        this.loading = false;
      }
      );
    }
  }
}
