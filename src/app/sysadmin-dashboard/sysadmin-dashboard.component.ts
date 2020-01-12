import { UserService } from './../service/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-sysadmin-dashboard',
  templateUrl: './sysadmin-dashboard.component.html',
  styleUrls: ['./sysadmin-dashboard.component.scss']
})
export class SysadminDashboardComponent implements OnInit, AfterViewInit {
  companies;
  usersOfCompany;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCompanies();
    this.getUsersOfCompany(1);
    this.getUsersOfCompany(2);
    this.getUsersOfCompany(3);
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: false, constrainWidth: false });
  }

  getCompanies() {
    this.userService.getCompanies().subscribe(
      (response) => {
        this.companies = response;
      }
    );
  }

  getUsersOfCompany(companyId) {
    this.userService.getUsersOfCompany(companyId).subscribe(
      (response) => {
        this.usersOfCompany = response;
        console.log(this.usersOfCompany);

      }
    );
  }

}
