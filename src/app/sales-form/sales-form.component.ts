import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SaleService } from '../service/sale.service';
import { CompanyService } from '../service/company.service';
import { UserService } from '../service/user.service';
import {
  datepickerMonths,
  datepickerWeekdays,
  datepickerWeekdaysShort,
  datepickerWeekdaysAbbrev,
  datepickerMonthsShort
} from '../reusables/datepicker/datepicker.config';
import * as M from 'materialize-css';

@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss']
})
export class SalesFormComponent implements OnInit, AfterViewInit {

  company;
  saleFormGroup;
  bookingTypes;
  isData;

  datepicker;
  months = datepickerMonths;
  monthsShort = datepickerMonthsShort;
  weekdays = datepickerWeekdays;
  weekdaysShort = datepickerWeekdaysShort;
  weekdaysAbbrev = datepickerWeekdaysAbbrev;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private saleService: SaleService,
    private companyService: CompanyService,
  ) { }

  ngOnInit() {
    this.company = this.companyService.getCompanyToken();

    this.saleFormGroup = this.fb.group({
      id: [null],
      invDate: ['', Validators.required],
      customer: ['', Validators.required],
      project: ['', Validators.required],
      net: ['', [Validators.required, Validators.min(0)]],
      vat: ['', Validators.required],
      cashflowdate: ['', Validators.required],
      bookingType: ['', Validators.required],
      invoice: [[]],
      company: [this.company]
    });

    // get resolver data
    const data = this.route.snapshot.data;
    this.bookingTypes = data.bookingTypes;

    // check if there is actual data in the data object
    if (data.sale) {
      this.isData = true;
    } else {
      this.isData = false;
    }

    // fill form if there is data
    if (data.sale) {
      this.saleFormGroup.patchValue(data.sale);
    }
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: false, constrainWidth: false });

    this.datepicker = document.querySelectorAll('.datepicker');
    M.Datepicker.init(this.datepicker, {
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

  setDatepickerInput() {
    // save date value from datepicker to input field
    const invDateInstance = document.querySelectorAll('#invDate') as unknown as HTMLScriptElement;
    const invDate = invDateInstance[0].value;
    this.saleFormGroup.controls.invDate.setValue(invDate);

    const cashflowdateInstance = document.querySelectorAll('#cashflowdate') as unknown as HTMLScriptElement;
    const cashflowdate = cashflowdateInstance[0].value;
    this.saleFormGroup.controls.cashflowdate.setValue(cashflowdate);
  }

  saveForm() {
    const sale = this.saleFormGroup.value;

    if (sale.id) {
      this.saleService.updateSale(sale).subscribe(
        result => {
          this.userService.showToast('Ausgangsrechnung wurde geändert');
        },
        error => {
          this.userService.showToast('Ups, da gibt es wohl ein Problem');
        },
        () => {
          this.router.navigate(['/einnahmen']);
        }
      );
    } else {
      this.saleService.createSale(sale).subscribe(
        result => {
          this.userService.showToast('Ausgangsrechnung wurde erstellt');
        },
        error => {
          this.userService.showToast('Ups, da gibt es wohl ein Problem');
        },
        () => {
          this.router.navigate(['/einnahmen']);
        }
      );
    }
  }

  deleteSale(sale) {
    this.saleService.deleteSale(sale).subscribe(
      result => {
        this.userService.showToast('Ausgangsrechnung wurde gelöscht');
      },
      error => {
        this.userService.showToast('Ups, da gibt es wohl ein Problem');
      },
      () => {
        this.router.navigate(['/einnahmen']);
      }
    );
  }

  cancelForm() {
    this.router.navigate(['/einnahmen']);
  }
}
