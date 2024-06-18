import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Subject } from 'rxjs';
import { RefreshToken } from '../models/refreshToken.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {
    this.$refreshToken.subscribe((res) => {
      this.getRefreshToken();
    });
  }

  public $refreshToken = new Subject<boolean>();
  public $refreshTokenReceived = new Subject<boolean>();

  refreshToken!: RefreshToken;

  getName() {
    return this.http.get('https://localhost:7060/api/Auth/GetName', {
      responseType: 'text',
    });
  }

  Login(user: Users) {
    return this.http.post('https://localhost:7060/api/Auth/Login', user);
  }

  getRefreshToken() {
    //debugger;
    let TOKEN_PARSED_DATA: any;
    let TOKEN_STORED_DATA: any;
    let ACCESS_TOKEN: any;
    let REFRESH_TOKEN: any;
    TOKEN_STORED_DATA = localStorage.getItem('token');
    if (TOKEN_STORED_DATA != null) {
      TOKEN_PARSED_DATA = JSON.parse(TOKEN_STORED_DATA);
      ACCESS_TOKEN = TOKEN_PARSED_DATA.token;
      REFRESH_TOKEN = TOKEN_PARSED_DATA.refreshToken;
    }
    this.refreshToken = {
      accessToken: `${ACCESS_TOKEN}`,
      refreshToken: `${REFRESH_TOKEN}`,
    };

    return this.http.post('https://localhost:7060/api/Auth/Refresh', this.refreshToken).subscribe((Res=>{
      localStorage.setItem('token', JSON.stringify(Res));
      this.$refreshTokenReceived.next(true);
    }))
  }
}
