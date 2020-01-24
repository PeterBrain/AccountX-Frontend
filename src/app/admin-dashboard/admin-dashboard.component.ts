import { ActivatedRoute } from '@angular/router';
import { UserService } from './../service/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, AfterViewInit {

  companies;
  companyId;
  usersOfCompany;
  search = '';

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.userService.callAppComponent();

    // get companies from resolver data
    const data = this.route.snapshot.data;
    this.companies = data.companies;

    // if there is only one company, show the company users as well
    if (this.companies.length === 1) {
      this.getUsersOfCompany(this.companies[0].id);
    }
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: false, constrainWidth: false });
  }

  getUsersOfCompany(companyId) {
    this.companyId = companyId;

    this.userService.getUsersOfCompany(companyId).subscribe(
      result => {
        this.usersOfCompany = result;
      },
      error => {},
      () => {}
    );
  }

}
