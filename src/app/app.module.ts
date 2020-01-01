import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {SalesComponent} from './sales/sales.component';
import {PurchasesComponent} from './purchases/purchases.component';
import {VatComponent} from './vat/vat.component';
import {PurchasesFormComponent} from './purchases-form/purchases-form.component';
import {SalesFormComponent} from './sales-form/sales-form.component';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSliderModule,
    MatTableModule,
    MatToolbarModule
} from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {JwtModule} from '@auth0/angular-jwt';
import {ReactiveFormsModule} from '@angular/forms';

export function tokenGetter() {
    return localStorage.getItem('access_token');
}

@NgModule({
    declarations: [
        AppComponent,
        SalesComponent,
        PurchasesComponent,
        VatComponent,
        PurchasesFormComponent,
        SalesFormComponent,
        LoginComponent,
        LogoutComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatTableModule,
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatSliderModule,
        MatPaginatorModule,
        MatIconModule,
        JwtModule.forRoot({
            config: {
                tokenGetter: tokenGetter,
                whitelistedDomains: ['localhost:4200']
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
