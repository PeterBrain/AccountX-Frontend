import { PurchaseService } from './../service/purchase.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CompanyService } from '../service/company.service';
import * as M from 'materialize-css';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit, AfterViewInit {

    purchases;
    empty;

    constructor(
        public purchaseService: PurchaseService,
        public companyService: CompanyService
    ) { }

    ngOnInit() {
        this.empty = false;
        this.purchaseService.getPurchases().subscribe(
            result => {
                this.purchases = result;
                // console.log('Purchases objects: ');
                // console.log(this.purchases);

                if (this.purchases.length === 0) {
                    this.empty = true;
                }
            },
            error => { },
            () => { }
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

        // generate a range object
        const range = XLSX.utils.decode_range(ws['!ref']);

        // remove last column I2 (mode_edit)
        range.e.c--;

        // reencode the range
        ws['!ref'] = XLSX.utils.encode_range(range);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, fileName);
    }
}
