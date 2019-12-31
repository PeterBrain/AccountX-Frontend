import { VatComponent } from './vat/vat.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { SalesComponent } from './sales/sales.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  // { path: '', redirectTo: 'einnahmen', pathMatch: 'full' },
  { path: 'einnahmen', component: SalesComponent },
  { path: 'ausgaben', component: PurchasesComponent },
  { path: 'ust', component: VatComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
