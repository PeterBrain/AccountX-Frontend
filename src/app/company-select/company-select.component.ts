import { UserService } from './../service/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import { CompanyService } from '../service/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.scss']
})
export class CompanySelectComponent implements OnInit, AfterViewInit {

  companies;

  constructor(
    private userService: UserService,
    private companyService: CompanyService,
    private router: Router
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
      result => {
        this.companies = result;
      },
      error => {},
      () => {
        if (this.companies.length === 0) {
          this.router.navigate(['firma-form']);
        }
      }
    );
  }

  setCompany(companyId) {
    this.companyService.setCompanyToken(companyId);
  }
}
