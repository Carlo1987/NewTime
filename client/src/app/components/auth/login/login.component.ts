import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loading:boolean = false; 
  public data = { email : '' , password : '' }
  public emptyInput:string = 'Campo obbligatorio';
  public errors_list:Array<any> = [];
  public access_denied:string = '';
  public success:string = '';


  constructor(
    private _router : Router,
    private  _authService : AuthService
   ){}



   login(){
    this.loading = true;
    this.errors_list = [];
    this.access_denied = '';
    this.success = '';

    this._authService.login(this.data).subscribe({

      next : (response) => {
        console.log(response);
        
        this.loading = false;
        sessionStorage.setItem('token' , response.token);
        sessionStorage.setItem('user' , JSON.stringify(response.user));
        window.location.reload();
      },

      error : (error) => {
        
        this.loading = false;

        if(error.status == 422){
          let errors = error.error.errors;
          if(errors.email)    this.errors_list.push(errors.email[0]);
          if(errors.password)   this.errors_list.push(errors.password[0]);
        
        }else if(error.status == 401){
          this.access_denied = error.error.message;
        
        }else{
          this.access_denied = 'Errore server';
          console.log(error);          
        }
        
      }
    })
    
   }

}
