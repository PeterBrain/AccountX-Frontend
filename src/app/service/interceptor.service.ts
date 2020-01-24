import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest,
    HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import * as M from 'materialize-css';

@Injectable({
    providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
    constructor() {
    }

    handleError(error: HttpErrorResponse) {
        // console.log('Oops... that shouldn\'t have happened!');

        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `Error: ${error.error.message}`; // client-side error
        } else {
            errorMessage = `Error Code: ${error.status}<br>Message: ${error.message}`; // server-side error
        }

        M.toast({
            html: errorMessage,
            displayLength: 10000
        });

        return throwError(error);
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(catchError(this.handleError));
    };
}
