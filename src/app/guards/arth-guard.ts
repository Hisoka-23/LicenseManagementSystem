import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const arthGuard: CanActivateFn = (route, state) => {
  // const router = inject(Router);

  // const localData = localStorage.getItem('angularToken');
  // debugger;
  // if(localData != null){
  //   return true;
  // } else {
  //   router.navigateByUrl('/login');
  //   return false;
  // }

  return true;
  
};
