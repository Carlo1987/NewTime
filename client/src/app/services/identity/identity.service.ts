import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class IdentityService {

  private identity = new BehaviorSubject<any>(this.getIdentity());
  private user_name = new BehaviorSubject<string>('');


  constructor(
    private _router : Router
  ){}

  getIdentity$ = this.identity.asObservable();
  getUserName$ = this.user_name.asObservable();


  getIdentity(){

    let result:any = null;
  
    if(sessionStorage.getItem('user')){
     
      let user = JSON.parse(sessionStorage.getItem('user')!);
      result = user;
    }

    return result;
  }




  setIdentity(user:any){
    this.identity.next(user);
  }



  setUserName(name:string):void{
    this.user_name.next(name);
  }




  deleteIdentity():void{
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    this.setIdentity(null);
    this._router.navigate(['']);
  }

}
