import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { UsersService } from './users.service';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  let TOKEN_PARSED_DATA: any;
  let TOKEN_STORED_DATA: any;
  let ACCESS_TOKEN: any;
  let REFRESH_TOKEN: any;
  let EMAIL_ID: any;
  const userSvc = inject(UsersService);
  TOKEN_STORED_DATA = localStorage.getItem('token');
  if (TOKEN_STORED_DATA != null) {
    TOKEN_PARSED_DATA = JSON.parse(TOKEN_STORED_DATA);
    ACCESS_TOKEN = TOKEN_PARSED_DATA.token;
    REFRESH_TOKEN = TOKEN_PARSED_DATA.refreshToken;
    EMAIL_ID = TOKEN_PARSED_DATA.username;
  }
  const cloneRequest = req.clone({
    setHeaders: { Authorization: `Bearer ${ACCESS_TOKEN}` },
  });
  return next(cloneRequest).pipe(
    catchError((err: HttpErrorResponse) => {
      //debugger;
      if (err.status === 401) {
        const isRefresh = confirm(
          'Your session is expired. Do you want to continiue?'
        );
        if (isRefresh) {
          userSvc.$refreshToken.next(true);
        }
      }
      return throwError(err);
    })
  );
};
