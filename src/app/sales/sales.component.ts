import { ActivatedRoute } from '@angular/router';
import { SaleService } from './../service/sale.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import { UserService } from '../service/user.service';
import * as M from 'materialize-css';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, AfterViewInit {

  sales;
  empty;

  constructor(
    private saleService: SaleService,
    private route: ActivatedRoute,
    public companyService: CompanyService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.empty = false;
    this.saleService.getSales().subscribe(
      result => {
        this.sales = result;
        console.log('Sales objects: ');
        console.log(this.sales);

        if (this.sales.length === 0) {
          this.empty = true;
        }
      },
      error => {},
      () => {}
    );
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: false, constrainWidth: false });

    const actionBtn = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(actionBtn);
  }

  exportexcel(tableId, fileName) {
    /* table id is passed over here */
    const element = document.getElementById(tableId);
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // remove last column I2 (mode_edit)
    delete ws.I2;

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, fileName);
  }
}
