import { Component, OnInit, inject } from '@angular/core';
import { ImagesService } from '../services/images.service';
import { LoginService } from '../services/login.service';
import { ImagesModel } from '../models/image.model';

@Component({
  selector: 'app-images',
  standalone: true,
  imports: [],
  providers:[ImagesService, LoginService],
  templateUrl: './images.component.html',
  styleUrl: './images.component.css'
})
export class ImagesComponent implements OnInit {

  imagesSvc = inject(ImagesService);

  lgnService= inject(LoginService)

  images!: any;

  ngOnInit(): void {
    this.getImages();

  }
  getImages() {
    this.imagesSvc.GetAll().subscribe((res) => {
      this.images = res;
    });
  }
}
