import { Component } from '@angular/core';
import { IdentityService } from './services/identity/identity.service';
import { AuthService } from './services/auth/auth.service';
import { Global } from './services/global';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 public user:any;
 public user_name:string = '';



  constructor(
    private _identityService : IdentityService,
    private _authService : AuthService
  ){

    this.getIdentity();
    this.getUserName();
  }


  getIdentity(){
    this._identityService.getIdentity$.subscribe(identity => {
      this.user = identity
      if(this.user != null) this._identityService.setUserName(this.user.name);
    });
  }



  getUserName(){
    this._identityService.getUserName$.subscribe(name =>  this.user_name = name);
  }



  logout(){
    this._authService.logout().subscribe(response=>{
      if(response){
        Global.remove_token();
      }
    })
  }



}
