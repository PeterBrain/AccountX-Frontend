import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SalesComponent } from './sales/sales.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { VatComponent } from './vat/vat.component';
import { PurchasesFormComponent } from './purchases-form/purchases-form.component';
import { SalesFormComponent } from './sales-form/sales-form.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';
import { CompanySelectComponent } from './company-select/company-select.component';
import { RegistrationComponent } from './registration/registration.component';
import { CompanyRegistrationComponent } from './company-registration/company-registration.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

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
        LogoutComponent,
        CompanySelectComponent,
        RegistrationComponent,
        CompanyRegistrationComponent,
        NotFoundComponent,
        AdminDashboardComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
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
