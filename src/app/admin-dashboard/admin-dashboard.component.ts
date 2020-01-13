import { UserService } from './../service/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {
  companies;
  usersOfCompany;

  constructor(
    private userService: UserService,
    private companyService: CompanyService
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
    this.companyService.getCompanies().subscribe(
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
