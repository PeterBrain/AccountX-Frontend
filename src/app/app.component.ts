import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './service/user.service';
import { CompanyService } from './service/company.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit, OnChanges {

  title = 'AccountX';
  currentYear;
  isLoggedIn = false;
  company;

  constructor(
    public router: Router,
    public userService: UserService,
    public companyService: CompanyService,
  ) { }

  ngOnChanges() {
    this.login();
  }

  ngOnInit() {
    this.login();

    // Update of current Company (for name in top left)^
    if (this.isLoggedIn) {
      this.companyService.getCompany(this.companyService.getCompanyToken()).subscribe(
        result => {
          this.companyService.currentCompany = JSON.parse(JSON.stringify(result));
        },
        error => {
          this.userService.showToast('Keine Firma ausgewählt');
        },
        () => {}
      );
    }

    this.currentYear = new Date().getFullYear().toString();

    // execute functions after login
    this.userService.invokeIsAdmin.subscribe(
      result => {
        this.checkIfUserIsAdmin();
        this.getCurrentUser();
      },
      error => {},
      () => {}
    );
  }

  ngAfterViewInit() {
    // keeps admin dashboard link even after page refresh
    if (this.isLoggedIn) {
      this.checkIfUserIsAdmin();
      this.getCurrentUser();
    }
  }

  login() {
    this.userService.isLoggedIn.subscribe(
      result => {
        this.isLoggedIn = result;
      },
      error => {},
      () => {}
    );
  }

  logout() {
    this.userService.logout();
  }

  checkIfUserIsAdmin() {
    const isLoggedIn = this.userService.isLoggedIn;

    if (isLoggedIn) {
      this.userService.getCurrentUser().subscribe(
        result => {
          const user = JSON.parse(JSON.stringify(result));
          const companies = user.companies;
          const isAdminOf = user.isAdminOf;

          this.userService.isAdmin = this.compareArrays(companies, isAdminOf);
        },
        error => {},
        () => {}
      );
    }
  }

  getCurrentUser() {
    // needs typesafe ('?') parameter in html, because html renders faster then the name of the user is loaded
    this.userService.getCurrentUser().subscribe(
      result => {
        this.userService.currentUser = result;
      },
      error => {},
      () => {}
    );
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
