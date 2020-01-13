import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CompanyService } from './company.service';

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {

    constructor(
        private http: HttpClient,
        private companyService: CompanyService
    ) { }

    getPurchases() {
        const companyId = this.companyService.getCompanyToken();
        return this.http.get('/api/purchases/?company=' + companyId);
    }

    getPurchase(id) {
        return this.http.get('/api/purchases/' + id + '/');
    }

    createPurchase(purchase) {
        return this.http.post('/api/purchases/', purchase);
    }

    updatePurchase(purchase) {
        return this.http.put('/api/purchases/' + purchase.id + '/', purchase);
    }

    deletePurchase(purchase) {
        return this.http.delete('/api/purchases/' + purchase.id + '/', purchase);
    }
}
