import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  readonly companyLocalStorageKey = 'company';
  currentCompany;

  constructor(
    private http: HttpClient
  ) { }

  getCompanies() {
    return this.http.get('/api/companies/');
  }

  getCompany(companyId: string) {
    return this.http.get('/api/companies/' + companyId + '/');
  }

  createCompany(company: any) {
    return this.http.post('/api/companies/', company);
  }

  updateCompany(company: { id: string; }) {
    const id = company.id;
    return this.http.put('/api/companies/' + id + '/', company);
  }

  deleteCompany(companyId: string) {
    return this.http.delete('/api/companies/' + companyId + '/');
  }

  getCompanyToken() {
    return localStorage.getItem(this.companyLocalStorageKey);
  }

  setCompanyToken(companyId: string) {
    localStorage.setItem(this.companyLocalStorageKey, companyId);

    // Update of current Company (for name in top left)
    this.getCompany(companyId).subscribe(
      result => {
        this.currentCompany = JSON.parse(JSON.stringify(result));
      },
      error => {
        console.log('Die Company konnte nicht gefunden werden');
      },
      () => {}
    );
  }

  unsetCompanyToken() {
    localStorage.removeItem(this.companyLocalStorageKey);
    this.currentCompany = '';
  }
}
