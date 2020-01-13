import { UserService } from './../service/user.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<Observable<any>> {

    constructor(
        private userService: UserService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.userService.getUser(route.paramMap.get('id'));
    }
}
