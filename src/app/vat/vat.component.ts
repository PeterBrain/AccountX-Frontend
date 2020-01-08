import { VatService } from './../service/vat.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss']
})
export class VatComponent implements OnInit, AfterViewInit {

  vatReport = ["", "", "", "", "", "", "", "", "", "", "", ""]; // initialize array
  //months = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  thisYear = new Date().getFullYear().toString();
  months = [
      ["Jan", this.thisYear + "-02-01", this.thisYear + "-01-01"],
      ["Feb", this.thisYear + "-03-01", this.thisYear + "-02-01"],
      ["Mar", this.thisYear + "-04-01", this.thisYear + "-03-01"],
      ["Apr", this.thisYear + "-05-01", this.thisYear + "-04-01"],
      ["Mai", this.thisYear + "-06-01", this.thisYear + "-05-01"],
      ["Jun", this.thisYear + "-07-01", this.thisYear + "-06-01"],
      ["Jul", this.thisYear + "-08-01", this.thisYear + "-07-01"],
      ["Aug", this.thisYear + "-09-01", this.thisYear + "-08-01"],
      ["Sep", this.thisYear + "-10-01", this.thisYear + "-09-01"],
      ["Okt", this.thisYear + "-11-01", this.thisYear + "-10-01"],
      ["Nov", this.thisYear + "-12-01", this.thisYear + "-11-01"],
      ["Dez", this.thisYear + "-12-31", this.thisYear + "-12-01"]
  ];
  companyId = this.userService.getCompanyToken();

  constructor(
    private vatService: VatService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: false, constrainWidth: false });

    const tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);
  }

  getData() {
      this.months.forEach((element, index) => {
          this.vatService.getVatReport(this.companyId, element[1], element[2]).subscribe(
              (response) => {
                  response[0]['month'] = element[0];
                  this.vatReport[index] = response[0];
              }
          );
      });
  }

}
