import {
  datepickerMonths,
  datepickerWeekdays,
  datepickerWeekdaysShort,
  datepickerWeekdaysAbbrev,
  datepickerMonthsShort
} from '../reusables/datepicker/datepicker.config';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as M from 'materialize-css';


@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss']
})
export class SalesFormComponent implements OnInit, AfterViewInit {

  saleFormGroup;
  companyOptions;
  bookingTypes;

  months = datepickerMonths;
  monthsShort = datepickerMonthsShort;
  weekdays = datepickerWeekdays;
  weekdaysShort = datepickerWeekdaysShort;
  weekdaysAbbrev = datepickerWeekdaysAbbrev;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.saleFormGroup = this.fb.group({
      invDate: ['', Validators.required],
      customer: ['', Validators.required],
      project: ['', Validators.required],
      net: ['', [Validators.required, Validators.min(0)]],
      vat: ['', Validators.required],
      cashFlowDate: ['', Validators.required],
      companies: [[''], Validators.required],
      bookingType: ['', Validators.required],
      invoice: ['', Validators.required]
    });

    // get resolver data
    const data = this.route.snapshot.data;
    this.companyOptions = data.companyOptions;
    this.bookingTypes = data.bookingTypes;
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: false, constrainWidth: false });

    const tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);

    const datepicker = document.querySelectorAll('.datepicker');
    M.Datepicker.init(datepicker, {
      format: 'yyyy-mm-dd',
      autoClose: true,
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
    alert('TODO: save form');
    this.router.navigate(['/einnahmen']);
  }
}
