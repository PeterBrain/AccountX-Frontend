import { UserService } from './../service/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CurrentUserResolver implements Resolve<Observable<any>> {

    constructor(
        private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.getCurrentUser();
    }
}
