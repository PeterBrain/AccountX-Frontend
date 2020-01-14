import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  title = 'AccountX';
  currentUser;
  isAdmin;
  currentYear;
  isLoggedIn = false;
  company;

  constructor(
    public router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    // needs typesafe ('?') parameter in html, because html renders faster then the name of the user is loaded
    this.userService.getCurrentUser().subscribe(
      (response) => {
        this.currentUser = response;
      }
    );

    this.currentYear = new Date().getFullYear().toString();

    this.userService.isLoggedIn.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });

    // TODO: check if user is admin, then set boolean
    // only then show admin menu in dropdown
    this.isAdmin = true;

  } z

  logout() {
    this.userService.logout();
  }
}
