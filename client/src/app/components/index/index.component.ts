import { Component , OnInit } from '@angular/core';
import { identity } from 'rxjs';
import { IdentityService } from 'src/app/services/identity/identity.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  public loading:boolean = true;
  public user:any = null;
  public users:any = null;


  constructor(
    private _identityService : IdentityService,
    private _usersService : UserService
  ){}


  ngOnInit(): void {
    this.getIdentity();
    this.getUsers();
  }




  getIdentity(){
    this._identityService.getIdentity$.subscribe(identity=>{
      if(identity != null)   this.user = identity;  
    });
  }



  getUsers(){
    this._usersService.getUsers().subscribe(users=> {
      if(this.user == null)  this.users = users[0].reverse();
      this.loading = false;
    });
  }



}
