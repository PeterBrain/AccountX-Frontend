import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor(
    private http: HttpClient
  ) { }

  getSales() {
    return this.http.get('/api/sales/');
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
