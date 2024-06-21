import { Injectable } from '@angular/core';
import { ImagesModel } from '../models/image.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  GetAll() {
    return this.http.get('https://localhost:7060/api/Images');
  }
}
