import { Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, SidebarComponent],
  providers:[LoginService],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit{
  lgnService = inject(LoginService);

  userSvc= inject(UsersService)

  username: any = '';

  users:any;


  ngOnInit(): void {
    this.getName();
    this.getAllUsers();
    this.getRoles();
  }

  getName() {
    this.lgnService.getName().subscribe((res) => {
      this.username = res;
      console.log(this.username);
    });
  }
  getAllUsers(){
    this.userSvc.GetAllUsers().subscribe((res=>{
      this.users=res;
    }));

  }
    getRoles(){
     //alert( this.lgnService.getRoleFromToken());
    }
}
