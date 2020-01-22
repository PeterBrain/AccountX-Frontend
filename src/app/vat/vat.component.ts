import { VatService } from './../service/vat.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import { CompanyService } from '../service/company.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-vat',
  templateUrl: './vat.component.html',
  styleUrls: ['./vat.component.scss']
})
export class VatComponent implements OnInit, AfterViewInit {

  vatReport = ['', '', '', '', '', '', '', '', '', '', '', '']; // initialize array
  currentYear = new Date().getFullYear().toString();
  months = [
    ['Jan', this.currentYear + '-02-01', this.currentYear + '-01-01'],
    ['Feb', this.currentYear + '-03-01', this.currentYear + '-02-01'],
    ['Mar', this.currentYear + '-04-01', this.currentYear + '-03-01'],
    ['Apr', this.currentYear + '-05-01', this.currentYear + '-04-01'],
    ['Mai', this.currentYear + '-06-01', this.currentYear + '-05-01'],
    ['Jun', this.currentYear + '-07-01', this.currentYear + '-06-01'],
    ['Jul', this.currentYear + '-08-01', this.currentYear + '-07-01'],
    ['Aug', this.currentYear + '-09-01', this.currentYear + '-08-01'],
    ['Sep', this.currentYear + '-10-01', this.currentYear + '-09-01'],
    ['Okt', this.currentYear + '-11-01', this.currentYear + '-10-01'],
    ['Nov', this.currentYear + '-12-01', this.currentYear + '-11-01'],
    ['Dez', this.currentYear + '-12-31', this.currentYear + '-12-01']
  ];
  companyId = this.companyService.getCompanyToken();

  constructor(
    private vatService: VatService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.getData();
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: false, constrainWidth: false });
  }

  getData() {
    this.months.forEach((element, index) => {
      this.vatService.getVatReport(this.companyId, element[1], element[2]).subscribe(
        (response) => {
          // puts api call responses in an array at the right index to get an ordered list
          // otherwise, because of the nature of asynchronous calls, we would get an unsorted list
          response[0].month = element[0];
          this.vatReport[index] = response[0];
        }
      );
    });
  }

  exportexcel(tableId1, tableId2, tableId3, fileName) {
    /* table id is passed over here */
    const element1 = document.getElementById(tableId1);
    const ws1: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element1);
    const element2 = document.getElementById(tableId2);
    const ws2: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element2);
    const element3 = document.getElementById(tableId3);
    const ws3: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element3);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws1, 'Umsatzsteuer');
    XLSX.utils.book_append_sheet(wb, ws2, 'Vorsteuer');
    XLSX.utils.book_append_sheet(wb, ws3, 'Ust. Zahllast');

    /* save to file */
    XLSX.writeFile(wb, this.currentYear + '_' + fileName);
  }

}
