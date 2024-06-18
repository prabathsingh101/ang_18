import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Users } from '../models/users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [],
  providers: [UsersService],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  constructor(private http: HttpClient, private svc: UsersService) {}

  ngOnInit(): void {
    this.getName();
    this.svc.$refreshTokenReceived.subscribe((res:any)=>{
      console.log('res', res);
      this.getName();
    })
  }

  getName() {
    this.svc.getName().subscribe((res) => {
      console.log('users', JSON.stringify(res));
    });
  }
}
