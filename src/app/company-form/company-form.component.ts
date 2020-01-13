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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService
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

    if (this.isData) {
      this.companyService.updateCompany(company).subscribe(
        (response) => {
          return response;
        }
      );
    } else {
      this.companyService.createCompany(company).subscribe(
        (response) => {
          return response;
        }
      );
    }
  }

  deleteCompany() {
    if (this.isData) {
      this.companyService.deleteCompany(this.companyFormGroup.value.id).subscribe(
        (response) => {
          this.router.navigate(['/admin-dashboard']);
        }
      );
    }
  }
}
