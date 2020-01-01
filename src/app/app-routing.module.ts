import {VatComponent} from './vat/vat.component';
import {PurchasesComponent} from './purchases/purchases.component';
import {SalesComponent} from './sales/sales.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';


const routes: Routes = [
    {path: '', redirectTo: 'einnahmen', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'einnahmen', component: SalesComponent, canActivate: [AuthGuard]},
    {path: 'ausgaben', component: PurchasesComponent, canActivate: [AuthGuard]},
    {path: 'ust', component: VatComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
