import { PurchaseService } from '../service/purchase.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PurchaseFormResolver implements Resolve<Observable<any>> {

    constructor(
        private purchaseService: PurchaseService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.purchaseService.getPurchase(route.paramMap.get('id'));
    }
}
