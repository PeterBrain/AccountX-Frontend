import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  readonly companyLocalStorageKey = 'company';

  constructor(
    private http: HttpClient
  ) { }

  getCompanies() {
    return this.http.get('/api/companies/');
  }

  getCompany(companyId: string) {
    return this.http.get('/api/companies/' + companyId + '/');
  }

  deleteCompany(companyId: string) {
    return this.http.delete('/api/companies/' + companyId + '/');
  }

  getCompanyToken() {
    return localStorage.getItem(this.companyLocalStorageKey);
  }

  setCompanyToken(companyId: string) {
    localStorage.setItem(this.companyLocalStorageKey, companyId);
  }
}
