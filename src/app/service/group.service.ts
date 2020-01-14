import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient
  ) { }

  getGroups(companyId: string) {
    return this.http.get('/api/groups/' + companyId + '/');
  }
}
