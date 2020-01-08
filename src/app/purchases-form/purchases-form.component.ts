import {
  datepickerMonths,
  datepickerWeekdays,
  datepickerWeekdaysShort,
  datepickerWeekdaysAbbrev,
  datepickerMonthsShort
} from '../reusables/datepicker/datepicker.config';
import {ActivatedRoute, Router} from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';
import {HttpClient} from '@angular/common/http';
import {PurchaseService} from '../service/purchase.service';
import {UserService} from '../service/user.service';

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
  companyOptions;
  ust;
  id;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.purchaseFormGroup = this.fb.group({
      id: [null],
      invNo: ['', [Validators.required, Validators.min(0)]],
      invDate: ['', Validators.required],
      biller: ['', Validators.required],
      ust: ['', Validators.required],
      net: ['', [Validators.required, Validators.min(0)]],
      cashflowdate: ['', Validators.required],
      company: [null, Validators.required],
      bookingType: [null, Validators.required],
      invoice: [null, Validators.required],
      notes: [null]
    });

    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.purchaseService.getPurchase(this.id).subscribe((response) => {
        this.purchaseFormGroup.patchValue(response, {emitEvent: false});
        this.ust = response['ust'];
        document.querySelectorAll('label').forEach(elem => elem.classList.add('active'));
      });
    }

    this.userService.getCompanies().subscribe((result) => {
      this.companyOptions = result;
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

  deletePurchase(purchase) {
    this.purchaseService.deletePurchase(purchase).subscribe(() => {
      this.router.navigate(['/ausgaben']);
    });
  }

}
