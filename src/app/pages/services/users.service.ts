import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl: string = 'https://localhost:7060/api/user/';
  constructor(private http: HttpClient) {}

  GetAllUsers() {
    return this.http.get(this.baseUrl+'GetAll');
  }
}
