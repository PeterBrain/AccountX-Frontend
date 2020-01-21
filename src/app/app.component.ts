import { GroupService } from './service/group.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnChanges, OnDestroy, DoCheck } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit, OnChanges {
  title = 'AccountX';
  currentUser;
  currentYear;
  isLoggedIn = false;
  company;

  constructor(
    public router: Router,
    public userService: UserService,
    private route: ActivatedRoute,
    private groupService: GroupService
  ) {
  }

  ngOnChanges() {
    this.login();

    // this.userService.getIsAdmin().subscribe(
    //   (response) => {
    //     console.log('is admin?');
    //     console.log(response);
    //   }
    // );
  }

  ngOnInit() {
    this.login();

    // needs typesafe ('?') parameter in html, because html renders faster then the name of the user is loaded
    // this.userService.getCurrentUser().subscribe(
    //   (response) => {
    //     this.currentUser = response;
    //   }
    // );

    // this.currentUser = this.userService.getCurrentUser();
    // console.log(this.currentUser);

    // this.currentUser = this.userService.getUsername();
    // console.log(this.currentUser);

    this.currentYear = new Date().getFullYear().toString();

    this.userService.invokeIsAdmin.subscribe(
      () => {
        this.checkIfUserIsAdmin();
      });
  }

  ngAfterViewInit() {
    // keeps admin dashboard link even after page refresh
    if (this.isLoggedIn) {
      this.checkIfUserIsAdmin();
    }
  }

  login() {
    this.userService.isLoggedIn.subscribe(
      (isLoggedIn) => {
        this.isLoggedIn = isLoggedIn;
      });
  }

  logout() {
    this.userService.logout();
  }

  checkIfUserIsAdmin() {
    const isLoggedIn = this.userService.isLoggedIn;

    if (isLoggedIn) {
      this.userService.getCurrentUser().subscribe(
        (response) => {
          const user = JSON.parse(JSON.stringify(response));
          const companies = user.companies;
          const isAdminOf = user.isAdminOf;

          this.userService.isAdmin = this.compareArrays(companies, isAdminOf);
        }
      );
    }
  }

  compareArrays(arr1, arr2) {
    // Check if the arrays are the same length
    if (arr1.length !== arr2.length) {
      return false;
    }

    // Check if all items exist and are in the same order
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }

    return true;

  }
}
