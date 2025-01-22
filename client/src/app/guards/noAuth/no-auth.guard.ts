import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const noAuthGuard: CanActivateFn = (route, state) => {

  if(sessionStorage.getItem('token')){
    const router = inject(Router);
    router.navigate(['']);
    return false;
  }
  return true;
};
