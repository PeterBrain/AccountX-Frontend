import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VatService {

  constructor(
    private http: HttpClient
  ) { }

  getVatReport(companyId, beforeDate, afterDate) {
    return this.http.get('/api/vatReport/?cid=' + companyId + '&before=' + beforeDate + '&after=' + afterDate);
  }
}
