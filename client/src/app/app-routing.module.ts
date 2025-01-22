import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { noAuthGuard } from './guards/noAuth/no-auth.guard';
import { authGuard } from './guards/auth/auth.guard';

import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EditComponent } from './components/user/edit/edit.component';
import { DeleteComponent } from './components/user/delete/delete.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';



const routes: Routes = [

  {path: '', component: IndexComponent },
  {path: 'login', component: LoginComponent , canActivate : [ noAuthGuard ]},
  {path: 'register', component: RegisterComponent , canActivate : [ noAuthGuard ]},

  {path: 'edit', component: EditComponent , canActivate : [ authGuard ]},
  {path: 'delete', component: DeleteComponent , canActivate : [ authGuard ]},

  {path: '**', component: PageNotFoundComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
