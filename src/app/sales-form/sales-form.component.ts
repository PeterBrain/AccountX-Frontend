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
import { SaleService } from '../service/sale.service';
import { CompanyService } from '../service/company.service';


@Component({
  selector: 'app-sales-form',
  templateUrl: './sales-form.component.html',
  styleUrls: ['./sales-form.component.scss']
})
export class SalesFormComponent implements OnInit, AfterViewInit {

  isToast = false;

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
    private saleService: SaleService,
    private companyService: CompanyService,
  ) {
  }

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

    const tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);

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
    let message;

    if (sale.id) {
      this.saleService.updateSale(sale).subscribe(() => {
        this.router.navigate(['/einnahmen']);
      });
      message = 'Ausgangsrechnung geändert';
    } else {
      this.saleService.createSale(sale).subscribe(() => {
        this.router.navigate(['/einnahmen']);
      });
      message = 'Ausgangsrechnung erstellt';
    }
    this.showToast(message);
  }

  cancelForm() {
    this.router.navigate(['/einnahmen']);
  }

  deleteSale(sale) {
    this.saleService.deleteSale(sale).subscribe(() => {
      this.router.navigate(['/einnahmen']);
    });
  }

  showToast(message: string) {
    this.isToast = true;
    M.toast({
      html: message,
      displayLength: 4000
    });
  }
}
