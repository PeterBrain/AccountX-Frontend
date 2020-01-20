import { BookingTypeService } from './../service/booking-type.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from '../service/company.service';

@Injectable({
    providedIn: 'root'
})
export class BookingTypesResolver implements Resolve<Observable<any>> {

    constructor(
        private bookingTypesService: BookingTypeService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.bookingTypesService.getBookingTypes();
    }
}
