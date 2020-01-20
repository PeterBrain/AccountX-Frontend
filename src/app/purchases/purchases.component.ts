import { PurchaseService } from './../service/purchase.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as M from 'materialize-css';

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit, AfterViewInit {

    purchases;
    /*paginationPages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    activePage = this.paginationPages !== undefined ? this.paginationPages[0] : null;*/

    constructor(
        private http: HttpClient,
        public purchaseService: PurchaseService) {
    }

    ngOnInit() {
        this.purchaseService.getPurchases().subscribe(
            (response) => {
                this.purchases = response;
                console.log('Purchases objects: ');
                console.log(this.purchases);
            }
        );
    }

    ngAfterViewInit() {
        const sidenav = document.querySelectorAll('.sidenav');
        M.Sidenav.init(sidenav);

        const elems = document.querySelectorAll('.dropdown-trigger');
        M.Dropdown.init(elems, { hover: false, constrainWidth: false });

        const tabs = document.querySelectorAll('.tabs');
        M.Tabs.init(tabs);

        const actionBtn = document.querySelectorAll('.fixed-action-btn');
        M.FloatingActionButton.init(actionBtn);
    }

    /*setActivePage(page) {
        if (page === 'next') {
            if (this.activePage < this.paginationPages.length) {
                this.activePage += 1;
            }
        } else if (page === 'previous') {
            if (this.activePage > 1) {
                this.activePage -= 1;
            }
        } else {
            this.activePage = page + 1;
        }
    }*/

    // delete will only be possible in the forms component
    // prevents accidental deletings in list views

    /*deletePurchase(booking: any) {
        this.bookingService.deleteBooking(booking).subscribe(() => {
            this.ngOnInit();
        });
    }*/

}
