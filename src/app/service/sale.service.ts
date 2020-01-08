import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  getSales() {
    const companyId = this.userService.getCompanyToken();
    return this.http.get('/api/sales/?company=' + companyId);
  }

  createSale(sale) {
    return this.http.post('/api/sales/', sale);
  }

  updateSale(sale) {
    return this.http.put('/api/sales/' + sale.id, sale);
  }

  deleteSale(sale) {
    return this.http.delete('/api/sales/' + sale.id, sale);
  }
}
