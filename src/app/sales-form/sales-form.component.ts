import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss']
})
export class SalesFormComponent implements OnInit, AfterViewInit {

  saleFormGroup;

  months =
    [
      'Jänner',
      'Februar',
      'März',
      'April',
      'Mai',
      'Juni',
      'Juli',
      'August',
      'September',
      'Oktober',
      'November',
      'Dezember'
    ];

  monthsShort =
    [
      'Jän',
      'Feb',
      'Mär',
      'Apr',
      'Mai',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Okt',
      'Nov',
      'Dez'
    ];

  weekdays =
    [
      'Sonntag',
      'Montag',
      'Dienstag',
      'Mittwoch',
      'Donnerstag',
      'Freitag',
      'Samstag'
    ];

  weekdaysShort =
    [
      'So',
      'Mo',
      'Di',
      'Mi',
      'Do',
      'Fr',
      'Sa'
    ];

  weekdaysAbbrev = ['M', 'D', 'M', 'D', 'F', 'S', 'S'];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.saleFormGroup = this.fb.group({
      invDate: ['', Validators.required],
      customer: ['', Validators.required],
      project: ['', Validators.required],
      net: ['', [Validators.required, Validators.min(0)]],
      vat: ['', Validators.required],
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
    this.router.navigate(['/einnahmen']);
  }
}
