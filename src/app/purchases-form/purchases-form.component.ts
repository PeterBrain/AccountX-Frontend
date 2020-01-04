import {
  datepickerMonths,
  datepickerWeekdays,
  datepickerWeekdaysShort,
  datepickerWeekdaysAbbrev,
  datepickerMonthsShort
} from '../reuseables/datepicker/datepicker.config';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-purchases-form',
  templateUrl: './purchases-form.component.html',
  styleUrls: ['./purchases-form.component.scss']
})
export class PurchasesFormComponent implements OnInit, AfterViewInit {

  purchaseFormGroup;
  months = datepickerMonths;
  monthsShort = datepickerMonthsShort;
  weekdays = datepickerWeekdays;
  weekdaysShort = datepickerWeekdaysShort;
  weekdaysAbbrev = datepickerWeekdaysAbbrev;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.purchaseFormGroup = this.fb.group({
      invNumber: ['', [Validators.required, Validators.min(0)]],
      invDate: ['', Validators.required],
      vendorCompany: ['', Validators.required],
      vat: ['', Validators.required],
      net: ['', [Validators.required, Validators.min(0)]],
      cashFlowDate: ['', Validators.required],
      company: ['', Validators.required],
      bookingType: ['', Validators.required],
      invoice: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: true, constrainWidth: false });

    const tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);

    const datepicker = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datepicker, {
      format: 'dd-mm-yyyy',
      i18n: {
        cancel: 'Abbrechen',
        months: this.months,
        monthsShort: this.monthsShort,
        weekdays: this.weekdays,
        weekdaysShort: this.weekdaysShort
      }
    });

    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);

  }

  saveForm() {
    console.log('saved form');
    this.router.navigate(['/ausgaben']);
  }

}
