import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from './login.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  let loginSvc = inject(LoginService);

  let toast = inject(ToastrService);

  if (loginSvc.isLoggedIn()) {
    return true;
  } else {
    toast.error('You are not authorized', 'Please Login First!');
    loginSvc.Logout();
    return false;
  }
};
