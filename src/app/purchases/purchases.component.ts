import { PurchaseService } from './../service/purchase.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as M from 'materialize-css';
import * as XLSX from 'xlsx';
import { CompanyService } from '../service/company.service';

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit, AfterViewInit {

    purchases;
    empty;

    constructor(
        private http: HttpClient,
        public purchaseService: PurchaseService,
        public companyService: CompanyService
    ) {
    }

    ngOnInit() {
        this.empty = false;
        this.purchaseService.getPurchases().subscribe(
            (response) => {
                this.purchases = response;
                console.log('Purchases objects: ');
                console.log(this.purchases);

                if (this.purchases.length === 0) {
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

    exportexcel(tableId, fileName) {
        /* table id is passed over here */
        const element = document.getElementById(tableId);
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        // remove last column J2 (mode_edit)
        delete ws.J2;

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, fileName);
    }

}
