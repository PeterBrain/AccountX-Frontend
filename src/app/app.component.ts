import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AccountX';
  currentYear;
  isLoggedIn = false;

  constructor(public router: Router, private userService: UserService) {
  }

  ngOnInit() {
    console.log(this.router.url);

    this.currentYear = new Date().getFullYear().toString();

    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
