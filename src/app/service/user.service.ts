import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})
export class UserService {

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
        console.log(user);
        return this.http.post('/api/users/', user);
    }

    login(userData: { username: string, password: string }) {
        this.http.post('/api/api-token-auth/', userData)
            .subscribe((res: any) => {
                this.isLoggedIn.next(true);
                localStorage.setItem('access_token', res.token);
                this.router.navigate(['einnahmen']);
            }, () => {
                alert('Wrong username or password');
            });
    }

    logout() {
        localStorage.removeItem(this.accessTokenLocalStorageKey);
        this.isLoggedIn.next(false);
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
}
