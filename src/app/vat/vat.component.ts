import { VatService } from './../service/vat.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss']
})
export class VatComponent implements OnInit, AfterViewInit {

  vatReport = [];
  months = ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  companyId = 1; // should come from current logged in company (localstorage or cookie)
  beforeDate = '2020-01-01';
  afterDate = '2019-12-01';

  constructor(
    private vatService: VatService
  ) { }

  ngOnInit() {
    this.getData();
    this.vatReport.sort();
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
      this.vatService.getVatReport(this.companyId, '2020-02-01', '2020-01-01').subscribe(
          (response) => {
              response[0]['month'] = this.months[0];
              console.log(response);
              this.vatReport.push(response);
          }
      );

      this.vatService.getVatReport(this.companyId, '2020-03-01', '2020-02-01').subscribe(
          (response) => {
              response[0]['month'] = this.months[1];
              this.vatReport.push(response);
          }
      );

      this.vatService.getVatReport(this.companyId, '2020-04-01', '2020-03-01').subscribe(
          (response) => {
              response[0]['month'] = this.months[2];
              this.vatReport.push(response);
          }
      );

      this.vatService.getVatReport(this.companyId, '2020-05-01', '2020-04-01').subscribe(
          (response) => {
              response[0]['month'] = this.months[3];
              this.vatReport.push(response);
          }
      );

      this.vatService.getVatReport(this.companyId, '2020-06-01', '2020-05-01').subscribe(
          (response) => {
              response[0]['month'] = this.months[4];
              this.vatReport.push(response);
          }
      );

      this.vatService.getVatReport(this.companyId, '2020-07-01', '2020-06-01').subscribe(
          (response) => {
              response[0]['month'] = this.months[5];
              this.vatReport.push(response);
          }
      );

      this.vatService.getVatReport(this.companyId, '2020-08-01', '2020-07-01').subscribe(
          (response) => {
              response[0]['month'] = this.months[6];
              this.vatReport.push(response);
          }
      );

      this.vatService.getVatReport(this.companyId, '2020-09-01', '2020-08-01').subscribe(
          (response) => {
              response[0]['month'] = this.months[7];
              this.vatReport.push(response);
          }
      );

      this.vatService.getVatReport(this.companyId, '2020-10-01', '2020-09-01').subscribe(
          (response) => {
              response[0]['month'] = this.months[8];
              this.vatReport.push(response);
          }
      );

      this.vatService.getVatReport(this.companyId, '2020-11-01', '2020-10-01').subscribe(
          (response) => {
              response[0]['month'] = this.months[9];
              this.vatReport.push(response);
          }
      );

      this.vatService.getVatReport(this.companyId, '2020-12-01', '2020-11-01').subscribe(
          (response) => {
              response[0]['month'] = this.months[10];
              this.vatReport.push(response);
          }
      );

      this.vatService.getVatReport(this.companyId, this.beforeDate, this.afterDate).subscribe(
          (response) => {
              response[0]['month'] = this.months[11];
              this.vatReport.push(response);
              console.log(this.vatReport);
          }
      );
  }

}
