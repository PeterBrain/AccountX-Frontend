import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CompanyService } from './company.service';
import * as M from 'materialize-css';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    isAdmin = false;
    invokeIsAdmin = new EventEmitter();
    currentUser;

    readonly accessTokenLocalStorageKey = 'access_token';
    isLoggedIn = new BehaviorSubject(false);

    constructor(
        private http: HttpClient,
        private router: Router,
        private jwtHelperService: JwtHelperService,
        private companyService: CompanyService
    ) {
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
        this.http.post('/api/api-token-auth/', userData)
            .subscribe((res: any) => {
                this.isLoggedIn.next(true);
                localStorage.setItem(this.accessTokenLocalStorageKey, res.token);

                this.router.navigate(['firmen']);
            }, () => {
                this.showToastRed('Benutzername oder Passwort falsch');
            });
    }

    logout() {
        localStorage.removeItem(this.accessTokenLocalStorageKey);
        localStorage.removeItem(this.companyService.companyLocalStorageKey);

        this.isLoggedIn.next(false);
        this.router.navigate(['/login']);
    }

    getUsersOfCompany(companyId) {
        return this.http.get('/api/users/?cid=' + companyId);
    }

    getUsername() {
        // if token exists, retrieve username
        if (localStorage.getItem(this.accessTokenLocalStorageKey)) {
            const token = localStorage.getItem(this.accessTokenLocalStorageKey);
            const decodedToken = this.jwtHelperService.decodeToken(token);
            return decodedToken.username;
        }
    }

    getCurrentUser() {
        // if token exists, retrieve user
        if (localStorage.getItem(this.accessTokenLocalStorageKey)) {
            const token = localStorage.getItem(this.accessTokenLocalStorageKey);
            const decodedToken = this.jwtHelperService.decodeToken(token);
            const user = this.getUser(decodedToken.user_id);
            return user;
        }
    }

    getUser(userId: string) {
        return this.http.get('/api/users/' + userId + '/');
    }

    createUser(user: any) {
        return this.http.post('/api/users/', user);
    }

    updateUser(user: { id: string; }) {
        return this.http.put('/api/users/' + user.id + '/', user);
    }

    deleteUser(userId: string) {
        return this.http.delete('/api/users/' + userId + '/');
    }

    callAppComponent() {
        this.invokeIsAdmin.emit();
    }

    showToastRed(message: string) {
        M.toast({
            html: message,
            displayLength: 4000,
            classes: 'red darken-4'
        });
    }

    showToast(message: string) {
        M.toast({
            html: message,
            displayLength: 4000
        });
    }
}
