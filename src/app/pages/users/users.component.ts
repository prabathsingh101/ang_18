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
  constructor(private http: HttpClient, private svcUsers: UsersService) {}

  users:any;

  ngOnInit(): void {
    this.getAllUsers();;

  }

  getAllUsers(){
    this.svcUsers.GetAllUsers().subscribe((res=>{
      this.users=res;
    }))
  }
}
