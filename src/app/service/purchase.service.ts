import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PurchaseService {

    constructor(
        private http: HttpClient,
        private userService: UserService) {
    }

    getPurchases() {
        const companyId = this.userService.getCompanyToken();
        return this.http.get('/api/purchases/?company=' + companyId);
    }

    createPurchase(purchase) {
        return this.http.post('/api/purchases/', purchase);
    }

    updatePurchase(purchase) {
        return this.http.put('/api/purchases/' + purchase.id, purchase);
    }

    deletePurchase(purchase) {
        return this.http.delete('/api/purchases/' + purchase.id, purchase);
    }
}
