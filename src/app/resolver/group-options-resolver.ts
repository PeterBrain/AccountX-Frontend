import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { GroupService } from '../service/group.service';

@Injectable({
    providedIn: 'root'
})
export class GroupOptionsResolver implements Resolve<Observable<any>> {

    constructor(
        private groupService: GroupService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.groupService.getGroups();
    }
}
