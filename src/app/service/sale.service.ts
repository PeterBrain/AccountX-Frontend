import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(
    private http: HttpClient,
    private companyService: CompanyService
  ) { }

  getSales() {
    const companyId = this.companyService.getCompanyToken();
    return this.http.get('/api/sales/?company=' + companyId);
  }

  getSale(saleId: string) {
    return this.http.get('/api/sales/' + saleId + '/');
  }

  createSale(sale) {
    return this.http.post('/api/sales/', sale);
  }

  updateSale(sale) {
    return this.http.put('/api/sales/' + sale.id + '/', sale);
  }

  deleteSale(sale) {
    return this.http.delete('/api/sales/' + sale.id + '/', sale);
  }
}
