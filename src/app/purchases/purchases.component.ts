import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {HttpClient} from '@angular/common/http';
import {BookingService} from '../service/booking.service';

// makes jquery usable
declare var $: any;

@Component({
    selector: 'app-purchases',
    templateUrl: './purchases.component.html',
    styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

    displayedColumns = ['company', 'booking_type', 'name', 'is_negative', 'cashflowdate', 'amount', 'id'];

    bookings: MatTableDataSource<any>;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

    constructor(private http: HttpClient, public bookingService: BookingService) {
    }

    ngOnInit() {
        $('.fixed-action-btn').floatingActionButton();
        $('select').formSelect();

        this.bookingService.getBookings().subscribe((response: any[]) => {
            this.bookings = new MatTableDataSource<any>(response);
            this.bookings.paginator = this.paginator;
        });
    }

    deleteBooking(booking: any) {
        this.bookingService.deleteBooking(booking).subscribe(() => {
            this.ngOnInit();
        });
    }

}
