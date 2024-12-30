import { Component , OnInit , Input , Output, EventEmitter , OnChanges, SimpleChanges } from '@angular/core';
import { IdentityService } from 'src/app/services/identity/identity.service';
import { User } from 'src/app/models/UserModel';


@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.scss']
})
export class UserdataComponent implements OnInit , OnChanges {

  public user = new User("","","","","");
  public emptyInput:string = 'Campo obbligatorio';
  private password_default:string = '12345678';
  public errors_list:Array<string> = [];
  
  @Input() text:any;
  @Input() loading:boolean = false;
  @Output() sendDataUser = new EventEmitter<any>();  
  @Input() errors:Array<any> = [];
  @Input() edit_denied:string = '';
  @Input() success:string = '';



  constructor(
    private _identityService : IdentityService,
  ){}



  ngOnInit(): void {
    this._identityService.getIdentity$.subscribe(identity=> {

      if(identity != null){
        this.user = identity;

        if(identity.status == 'default'){
          this.user.password = this.password_default;
          this.user.password_confirmation = this.password_default;
        } 
      }
    });
  }

  

  ngOnChanges(changes: SimpleChanges): void {
    
    this.errors_list = []; 
    
    if(changes['errors']){
      let errors = changes['errors'].currentValue;

      if(errors.name)  this.errors_list.push(errors.name[0]);
      if(errors.surname)    this.errors_list.push(errors.surname[0]);
      if(errors.email)    this.errors_list.push(errors.email[0]);
      if(errors.password)   this.errors_list.push(errors.password[0]);
    }
  
  }



  send_data(form:any){   
    this.sendDataUser.emit(this.user);  
    
    if(this.user == null)  form.reset();
  }


}
