import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class IdentityService {

  private identity = new BehaviorSubject<any>(this.setIdentity());
  private user_name = new BehaviorSubject<string>('');

  getIdentity$ = this.identity.asObservable();
  getUserName$ = this.user_name.asObservable();


  setIdentity(){

    let result:any = null;
  
    if(sessionStorage.getItem('user')){
     
      let user = JSON.parse(sessionStorage.getItem('user')!);
      result = user;
    }

    return result;
  }




  setUserName(name:string):void{
    this.user_name.next(name);
  }

}
