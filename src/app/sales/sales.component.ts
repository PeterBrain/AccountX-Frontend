import { SaleService } from './../service/sale.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit, AfterViewInit {

  sales;

  constructor(
    private saleService: SaleService
  ) { }

  ngOnInit() {
    this.saleService.getSales().subscribe(
      (response) => {
        this.sales = response;
        console.log(this.sales);
      }
    );
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: false, constrainWidth: false });
    //auf false

    const tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);

    const actionBtn = document.querySelectorAll('.fixed-action-btn');
    M.FloatingActionButton.init(actionBtn);
  }

}
