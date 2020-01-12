import { UserService } from './../service/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.scss']
})
export class CompanySelectComponent implements OnInit, AfterViewInit {

  companies;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCompanies();
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

  setCompany(companyId) {
    this.userService.setCompanyToken(companyId);
  }
}
