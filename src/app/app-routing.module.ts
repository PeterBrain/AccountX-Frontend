import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {CompanyRegistrationComponent} from './company-registration/company-registration.component';
import {RegistrationComponent} from './registration/registration.component';
import {CompanySelectComponent} from './company-select/company-select.component';
import {SalesComponent} from './sales/sales.component';
import {SalesFormComponent} from './sales-form/sales-form.component';
import {PurchasesComponent} from './purchases/purchases.component';
import {PurchasesFormComponent} from './purchases-form/purchases-form.component';
import {VatComponent} from './vat/vat.component';

const routes: Routes = [
    {path: '', redirectTo: 'ausgaben', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'firmen', component: CompanySelectComponent, canActivate: [AuthGuard]},
    {path: 'firma-erstellen', component: CompanyRegistrationComponent},
    {path: 'einnahmen', component: SalesComponent, canActivate: [AuthGuard]},
    {path: 'einnahmen-form', component: SalesFormComponent, canActivate: [AuthGuard]},
    {path: 'einnahmen-form/:id', component: SalesFormComponent, canActivate: [AuthGuard]},
    {path: 'ausgaben', component: PurchasesComponent, canActivate: [AuthGuard]},
    {path: 'ausgaben-form', component: PurchasesFormComponent, canActivate: [AuthGuard]},
    {path: 'ausgaben-form/:id', component: PurchasesFormComponent, canActivate: [AuthGuard]},
    {path: 'ust', component: VatComponent, canActivate: [AuthGuard]},

    {path: '**', component: NotFoundComponent}, // last line (everything else -> 404)
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
