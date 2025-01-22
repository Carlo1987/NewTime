import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { IdentityService } from 'src/app/services/identity/identity.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  public text = { title : 'Aggiornare' , button : 'Aggiorna' };
  public loading:boolean = false; 
  public errors:Array<any> = [];
  public edit_denied:string = '';
  public success:string = '';


  constructor(
    private _userService : UserService,
    private _identityService : IdentityService
  ){}





  edit(user:any){
    this.loading = true;
    this.success = '';

    this._userService.editUser(user).subscribe({

      next : (response) => {
        this.loading = false;
        sessionStorage.setItem('user' , JSON.stringify(response.user));
        this._identityService.setUserName(response.user.name);
        this.success = response.message;
      },


      error : (error) => {
        this.loading = false;

        if(error.status == 422){
          this.errors = error.error.errors
 
        }else if(error.status == 409){
          this.edit_denied = error.error.message;

        }else{
          console.log(error) 
          this.edit_denied = 'Errore server';
        }

      }
    })
  }

}
