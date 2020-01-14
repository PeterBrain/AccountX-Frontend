import { SaleService } from './../service/sale.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SaleFormResolver implements Resolve<Observable<any>> {

    constructor(
        private saleService: SaleService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.saleService.getSale(route.paramMap.get('id'));
    }
}
