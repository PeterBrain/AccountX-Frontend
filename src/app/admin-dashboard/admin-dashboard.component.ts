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
  companyId;
  usersOfCompany;

  constructor(
    private userService: UserService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.userService.callAppComponent();

    this.getCompanies();
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

        // if there is only one company, show the company users as well
        if (this.companies.length === 1) {
          this.getUsersOfCompany(this.companies[0].id);
        }

      }
    );
  }

  getUsersOfCompany(companyId) {
    this.companyId = companyId;

    this.userService.getUsersOfCompany(companyId).subscribe(
      (response) => {
        this.usersOfCompany = response;
      }
    );
  }

}
