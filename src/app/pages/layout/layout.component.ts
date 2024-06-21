import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  providers:[LoginService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit{
  lgnService = inject(LoginService);

  username: any = '';

  ngOnInit(): void {
    this.getName();

  }

  getName() {
    this.lgnService.getName().subscribe((res) => {
      this.username = res;
      console.log(this.username);
    });
  }
}
