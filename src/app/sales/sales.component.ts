import { ActivatedRoute } from '@angular/router';
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
  empty;

  constructor(
    private saleService: SaleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.empty = false;
    this.saleService.getSales().subscribe(
      (response) => {
        this.sales = response;
        console.log('Sales objects: ');
        console.log(this.sales);

        if (this.sales.length === 0) {
          this.empty = true;
        }
      }
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

}
