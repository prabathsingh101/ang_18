import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../models/users';
import { Subject } from 'rxjs';
import { RefreshToken } from '../models/refreshToken.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://localhost:7060/api/Auth/';
  constructor(private http: HttpClient) {}

  GetAllUsers() {
    return this.http.get(`${this.baseUrl}GetAll`);
  }
}
