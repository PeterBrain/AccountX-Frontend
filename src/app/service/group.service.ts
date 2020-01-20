import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(
    private http: HttpClient
  ) { }

  getGroups() {
    return this.http.get('/api/groups/');
  }

  getGroup(groupId: string) {
    return this.http.get('/api/groups/' + groupId + '/');
  }
}
