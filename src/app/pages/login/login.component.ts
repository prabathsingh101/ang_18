import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../models/users';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [UsersService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder, private services: UsersService) {}

  isLoginView: boolean = true;

  loginForms!: FormGroup;

  userRegisterObj: any = {
    userName: '',
    password: '',
    emailId: '',
  };

  userLogin: any = {
    Username: '',
    Password: '',
  };

  user!: Users;

  ngOnInit(): void {
    this.loginForms = new FormGroup({
      Username: new FormControl('', Validators.required),
      Password: new FormControl('', Validators.required),
    });
  }

  router = inject(Router);

  onRegister() {
    debugger;
    const isLocalData = localStorage.getItem('angular18Local');
    if (isLocalData != null) {
      const localArray = JSON.parse(isLocalData);
      localArray.push(this.userRegisterObj);
      localStorage.setItem('angular18Local', JSON.stringify(localArray));
    } else {
      const localArray = [];
      localArray.push(this.userRegisterObj);
      localStorage.setItem('angular18Local', JSON.stringify(localArray));
    }
    alert('Registration Success');
  }

  onLogin() {
    debugger;
    const isLocalData = localStorage.getItem('angular18Local');
    if (isLocalData != null) {
      const users = JSON.parse(isLocalData);

      const isUserFound = users.find(
        (m: any) =>
          m.userName == this.userLogin.userName &&
          m.password == this.userLogin.password
      );
      if (isUserFound != undefined) {
        this.router.navigateByUrl('dashboard');
      } else {
        alert('User name or password is Wrong');
      }
    } else {
      alert('No User Found');
    }
  }
  login() {
    if (this.loginForms.valid) {
      this.user = {
        Username: this.loginForms.value.Username,
        Password: this.loginForms.value.Password,
      };
      console.log('users', this.user);
      this.services.Login(this.user).subscribe((res:any) => {

        console.log('response', res);
        localStorage.setItem('token', JSON.stringify(res));

        // let TOKEN_STORED_DATA: any = localStorage.getItem('token');
        // let TOKEN_PARSED_DATA = JSON.parse(TOKEN_STORED_DATA);
        // let ACCESS_TOKEN = TOKEN_PARSED_DATA.token;
        // console.log('ACCESS_TOKEN', ACCESS_TOKEN);

        let data = Object.entries(res);
        if (data[5][1]) {
          this.router.navigateByUrl('dashboard');
        }
      });
    }
  }
}
