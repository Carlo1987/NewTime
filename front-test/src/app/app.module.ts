import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { HttpClientModule , HTTP_INTERCEPTORS  } from '@angular/common/http';
import { TokenInterceptor } from './interceptors/token/token.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EditComponent } from './components/user/edit/edit.component';
import { DeleteComponent } from './components/user/delete/delete.component';
import { UserdataComponent } from './components/includes/userdata/userdata.component';
import { LoadingComponent } from './components/includes/loading/loading.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { IndexComponent } from './components/index/index.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EditComponent,
    DeleteComponent,
    UserdataComponent,
    LoadingComponent,
    PageNotFoundComponent,
    IndexComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,        
    FormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, 
      multi: true  
    }   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
