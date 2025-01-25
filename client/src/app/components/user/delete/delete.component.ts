import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { IdentityService } from 'src/app/services/identity/identity.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  public loading:boolean = false;
  public error:string = '';

  constructor(
    private _identityService : IdentityService,
    private _userService : UserService
  ){}


  delete(){
    this.loading = true;

    this._userService.deleteUser().subscribe({

      next : () => {
        this.loading = false;
        this._identityService.deleteIdentity();
      },

      error : (error) => {
        this.loading = false;

        if(error.status == 409){
          this.error = error.error.message;
        
        }else{
          console.log(error);
          this.error = 'Errore durante eliminazione Utente';
        }
      }
    })
    
  }

}
