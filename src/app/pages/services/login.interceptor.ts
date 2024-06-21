import {
  HttpClient,
  HttpErrorResponse,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { LoginService } from './login.service';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { TokenApiModel } from '../models/token-api.model';
import { RefreshToken } from '../models/refreshToken.model';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  var loginSvc = inject(LoginService);

  var httpRequestClient = inject(HttpClient);

  const myToken = loginSvc.getToken();

  let router = inject(Router);

  let cloneRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${myToken}`,
    },
  });

  return next(cloneRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handleUnAuthorizedError(cloneRequest, next);
      }
      return throwError(()=> error)
    })
  );
  function handleUnAuthorizedError(req: HttpRequest<any>, next: HttpHandlerFn) {
    let tokeApiModel = new TokenApiModel();
    tokeApiModel.accessToken = loginSvc.getToken()!;
    tokeApiModel.refreshToken = loginSvc.getRefreshToken()!;

    return loginSvc.renewToken(tokeApiModel).pipe(
      switchMap((data: TokenApiModel) => {
        loginSvc.storeRefreshToken(data.refreshToken);
        loginSvc.storeToken(data.accessToken);
        req = req.clone({
          setHeaders: { Authorization: `Bearer ${data.accessToken}` }, // "Bearer "+myToken
        });
        return next(req);
      }),
      catchError((err) => {
        return throwError(() => {
          //this.toast.warning({detail:"Warning", summary:"Token is expired, Please Login again"});
          loginSvc.Logout();
        });
      })
    );
  }
};
