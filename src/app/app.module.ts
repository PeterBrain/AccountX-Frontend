import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SalesComponent } from './sales/sales.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { VatComponent } from './vat/vat.component';

@NgModule({
  declarations: [
    AppComponent,
    SalesComponent,
    PurchasesComponent,
    VatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
