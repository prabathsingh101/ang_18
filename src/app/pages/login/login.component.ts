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
import { LoginService } from '../services/login.service';
import { UserStoreService } from '../services/user-store.service';
import { ToastrService } from 'ngx-toastr';
import ValidateForm from '../helpers/validationform';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  providers: [UsersService, LoginService, UserStoreService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private loginSvc: LoginService,
    private userStore: UserStoreService,
    private toast: ToastrService
  ) {}

  isLoginView: boolean = true;

  loginForms!: FormGroup;

  responseData: any;

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
    this.loginForms = this.fb.group({
      Username: ['', Validators.required],
      Password: ['', Validators.required],
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

      this.loginSvc.login(this.loginForms.value).subscribe({
        next: (res) => {
          //this.loginForms.reset();
          let data = JSON.stringify(res);
          let loggeduser = JSON.parse(data);
          if (loggeduser.statusCode === 0) {
            this.toast.error(loggeduser.message, 'Failed', { timeOut: 5000 });
          } else {
            this.loginSvc.storeToken(loggeduser.token);
            this.loginSvc.storeRefreshToken(loggeduser.refreshToken);
            const tokenPayload = this.loginSvc.decodedToken();
            this.userStore.setFullNameForStore(tokenPayload.name);
            this.userStore.setRoleForStore(tokenPayload.role);
            this.toast.success('Logged in successfully', 'Success', {
              timeOut: 3000,
            });
            this.router.navigateByUrl('dashboard');
          }
        },
        error: (err) => {
          this.toast.error('Logged in failed', 'Failed', { timeOut: 5000 });
        },
      });
    }else{
      ValidateForm.validateAllFormFields(this.loginForms);
    }
  }
}
