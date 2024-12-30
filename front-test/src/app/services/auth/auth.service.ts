import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';                 
import { Observable } from 'rxjs'; 
import { Global } from '../global';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private url_back:string = Global.url_back;

  constructor(
    private _http : HttpClient,
  ){}





  register(user:any):Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url_back+'/register' , params , { headers , withCredentials:true });
  }



  login(data:any):Observable<any>{
    let params = JSON.stringify(data);
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url_back+'/login' , params , {headers , withCredentials:true});
  }




  logout(){
    let headers = new HttpHeaders().set('Authorization',`token`);
    return this._http.get(this.url_back+'/logout', {headers , withCredentials:true});
  }



}
