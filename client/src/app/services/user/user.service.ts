import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from '../global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url_back:string = Global.url_back;

  constructor(
    private _http : HttpClient
  ) {}



  getUsers():Observable<any>{
    return this._http.get(this.url_back+'/getUsers');
  }


  editUser(user:any):Observable<any>{
    let params = JSON.stringify(user);
    let headers = new HttpHeaders().set('Authorization','token')
                                   .set('Content-Type','application/json');
    return this._http.put(this.url_back+'/editUser' , params , {headers } );
  }




  deleteUser():Observable<any>{
    let headers = new HttpHeaders().set('Authorization','token');
    return this._http.delete(this.url_back+'/deleteUser' , { headers });
  }

}
