import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginFormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService) {
  }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy() {
    console.log('destroyed');
    this.userService.callAppComponent();
  }

  login() {
    this.userService.login(this.loginFormGroup.value);
  }
}
