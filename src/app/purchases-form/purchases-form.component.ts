import {
  datepickerMonths,
  datepickerWeekdays,
  datepickerWeekdaysShort,
  datepickerWeekdaysAbbrev,
  datepickerMonthsShort
} from '../reusables/datepicker/datepicker.config';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import { HttpClient } from '@angular/common/http';
import { PurchaseService } from '../service/purchase.service';
import { UserService } from '../service/user.service';
import { BookingTypeService } from '../service/booking-type.service';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-purchases-form',
  templateUrl: './purchases-form.component.html',
  styleUrls: ['./purchases-form.component.scss']
})
export class PurchasesFormComponent implements OnInit, AfterViewInit {

  company;
  purchaseFormGroup;
  bookingTypes;
  isData;
  ust;
  company;
  months = datepickerMonths;
  monthsShort = datepickerMonthsShort;
  weekdays = datepickerWeekdays;
  weekdaysShort = datepickerWeekdaysShort;
  weekdaysAbbrev = datepickerWeekdaysAbbrev;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private bookingTypeService: BookingTypeService,
    private userService: UserService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.purchaseFormGroup = this.fb.group({
      id: [null],
      invNo: ['', Validators.required],
      invDate: ['', Validators.required],
      biller: ['', Validators.required],
      vat: ['', Validators.required],
      net: ['', [Validators.required, Validators.min(0)]],
      cashflowdate: ['', Validators.required],
      bookingType: ['', Validators.required],
      invoice: [null],
      notes: [null],
      company: [null] //needed for edit
    });

    // get resolver data
    const data = this.route.snapshot.data;

    this.company = this.companyService.getCompanyToken(); //is this needed? test
    // check if there is actual data in the data object
    if (data.purchase) {
      this.isData = true;
    } else {
      this.isData = false;
    }

    // fill form if there is data
    if (data.purchase) {
      this.purchaseFormGroup.patchValue(data.purchase);
    }
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

    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);

  }

  saveForm() {
    const purchase = this.purchaseFormGroup.value;

    if (purchase.id) {
      this.purchaseService.updatePurchase(purchase).subscribe(() => {
        this.ngOnInit();
      });
    } else {
      this.purchaseService.createPurchase(purchase).subscribe(() => {
        this.router.navigate(['/ausgaben']);
      });
    }
  }

  cancelForm() {
    this.router.navigate(['/einnahmen']);
  }

  deletePurchase(purchase) {
    this.purchaseService.deletePurchase(purchase).subscribe(() => {
      this.router.navigate(['/ausgaben']);
    });
  }

}
