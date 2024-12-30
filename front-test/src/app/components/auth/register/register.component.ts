import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {

  public text = { title : 'Registrazione' , button : 'Registrati' };
  public loading:boolean = false; 
  public errors:Array<any> = [];
  public edit_denied:string = '';
  public success:string = '';



  constructor(
   private  _authService : AuthService
  ){}


  register(user:any){    
     this.success = '';
     this.loading = true;

     this._authService.register(user).subscribe({

      next : (response) => {
        this.loading = false;
        this.success = response.message;
      },


      error : (error) => {
        this.loading = false;
     
        if(error.status == 422){    
          this.errors = error.error.errors
 
        }else{
          console.log(error) 
          this.edit_denied = 'Errore server';
        }
       
      }
      
    })
    
  }

}
