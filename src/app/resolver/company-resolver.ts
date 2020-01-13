import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { CompanyService } from '../service/company.service';

@Injectable({
    providedIn: 'root'
})
export class CompanyResolver implements Resolve<Observable<any>> {

    constructor(
        private companyService: CompanyService) {
    }

    resolve(route: ActivatedRouteSnapshot) {
        return this.companyService.getCompany(route.paramMap.get('id'));
    }
}
