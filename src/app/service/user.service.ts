import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    companies;

    readonly companyLocalStorageKey = 'company';

    readonly accessTokenLocalStorageKey = 'access_token';
    isLoggedIn = new BehaviorSubject(false);

    constructor(private http: HttpClient, private router: Router, private jwtHelperService: JwtHelperService) {
        const token = localStorage.getItem(this.accessTokenLocalStorageKey);
        if (token) {
            console.log('Token expiration date: ' + this.jwtHelperService.getTokenExpirationDate(token));
            const tokenValid = !this.jwtHelperService.isTokenExpired(token);
            this.isLoggedIn.next(tokenValid);
        }
    }

    register(user: { username: string, password: string }) {
        return this.http.post('/api/users/', user);
    }

    login(userData: { username: string, password: string }) {
        // this.getCompanies().subscribe(
        //     (response) => {
        //         this.companies = response;
        //     }
        // );

        // const companyCount = this.countProperties(this.companies);

        this.http.post('/api/api-token-auth/', userData)
            .subscribe((res: any) => {
                this.isLoggedIn.next(true);
                localStorage.setItem(this.accessTokenLocalStorageKey, res.token);

                // console.log(companyCount);

                // if more company are available, route to company selection
                // if (companyCount > 1) {
                //     this.router.navigate(['firmen']);
                // } else {
                //     this.router.navigate(['einnahmen']);
                // }

                this.router.navigate(['firmen']);
            }, () => {
                alert('Wrong username or password');
            });
    }

    logout() {
        localStorage.removeItem(this.accessTokenLocalStorageKey);
        this.isLoggedIn.next(false);
        // resets the companies, can probably be removed when the company is fixed in localstorage
        // this.companies = null;
        this.router.navigate(['/login']);
    }

    getUsername() {
        // if token exists, retrieve username
        if (localStorage.getItem(this.accessTokenLocalStorageKey)) {
            const token = localStorage.getItem(this.accessTokenLocalStorageKey);
            const decodedToken = this.jwtHelperService.decodeToken(token);
            return decodedToken.username;
        }
    }

    getCompanies() {
        return this.http.get('/api/companies/');
    }

    getCompanyToken() {
        return localStorage.getItem(this.companyLocalStorageKey);
    }

    setCompanyToken(companyId) {
        localStorage.setItem(this.companyLocalStorageKey, companyId);
    }

    countProperties(obj) {
        let count = 0;

        for (const prop in obj) {
            if (obj.hasOwnProperty(prop)) {
                ++count;
            }
        }

        return count;
    }
}
