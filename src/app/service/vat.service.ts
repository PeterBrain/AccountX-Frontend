import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VatService {

  constructor(
    private http: HttpClient
  ) { }

  getVatReport(companyId, startDate, endDate) {
    // http://127.0.0.1:8000/ustReport/?cid=1&before=2022-02-01&after=2012-02-1
    return this.http.get('/api/ustReport/?cid=' + companyId + '&before=' + startDate + '&after=' + endDate);
  }
}
