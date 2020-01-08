import { VatService } from './../service/vat.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss']
})
export class VatComponent implements OnInit, AfterViewInit {

  vatReport;
  companyId = 1; // should come from current logged in company (localstorage or cookie) 
  startDate = '2022-02-01';
  endDate = '2012-02-1';

  constructor(
    private vatService: VatService
  ) { }

  ngOnInit() {
    this.vatService.getVatReport(this.companyId, this.startDate, this.endDate).subscribe(
      (response) => {
        this.vatReport = response;
        console.log(this.vatReport);
      }
    );
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: true, constrainWidth: false });

    const tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);
  }

}
