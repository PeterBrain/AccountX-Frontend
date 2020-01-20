import { CompanyService } from './../service/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as M from 'materialize-css';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit, AfterViewInit {
  companyFormGroup;
  isData;
  isToast = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService,
  ) { }

  ngOnInit() {
    this.companyFormGroup = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: [null]
    });

    const data = this.route.snapshot.data;

    // check if there is actual data in the data object
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      this.isData = false;
    } else {
      this.isData = true;
    }

    // fill form if there is data
    if (data.company) {
      this.companyFormGroup.patchValue(data.company);
    }
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: false, constrainWidth: false });

    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
  }

  saveForm() {
    const company = this.companyFormGroup.value;
    let message;
    let companyName;

    if (this.isData) {
      this.companyService.updateCompany(company).subscribe(
        (response) => {
          // same as: response.name but linter does not like it this way
          console.log(JSON.parse(JSON.stringify(response)).name);
          companyName = JSON.parse(JSON.stringify(response)).name;
          return response;
        }
      );

      message = 'Firma geändert';
    } else {
      this.companyService.createCompany(company).subscribe(
        (response) => {
          companyName = JSON.parse(JSON.stringify(response)).name;
          return response;
        }
      );

      message = 'Firma erstellt';
    }

    this.router.navigate(['/admin-dashboard']);

    // does not log the company name only inside subscribe, why?
    console.log(companyName);

    this.showToast(message);
  }

  deleteCompany() {
    if (this.isData) {
      this.companyService.deleteCompany(this.companyFormGroup.value.id).subscribe(
        (response) => {
          this.router.navigate(['/admin-dashboard']);
        }
      );

      this.showToast('Firma gelöscht.');
    }
  }

  cancelForm() {
    this.router.navigate(['/admin-dashboard']);
  }

  showToast(message: string) {
    this.isToast = true;
    M.toast({
      html: message,
      displayLength: 4000
    });
  }
}
