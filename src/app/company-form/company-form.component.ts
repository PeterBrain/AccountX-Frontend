import { CompanyService } from './../service/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../service/user.service';
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
    private userService: UserService,
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
        result => {
          // same as: response.name but linter does not like it this way
          const companyName = JSON.parse(JSON.stringify(result)).name;
          this.userService.showToast('Firma ' + companyName + ' wurde geändert');
        },
        error => {
          this.userService.showToast('Ups, da gibt es wohl ein Problem');
        },
        () => {
          this.router.navigate(['/admin-dashboard']);
        }
      );
    } else {
      this.companyService.createCompany(company).subscribe(
        result => {
          const companyName = JSON.parse(JSON.stringify(result)).name;
          this.companyService.setCompanyToken(JSON.parse(JSON.stringify(result)).id);
          this.userService.showToast('Firma ' + companyName + ' wurde erstellt');
        },
        error => {
          this.userService.showToast('Ups, da gibt es wohl ein Problem');
        },
        () => {
          this.router.navigate(['/admin-dashboard']);
        }
      );
    }
  }

  deleteCompany() {
    if (this.isData) {
      this.companyService.deleteCompany(this.companyFormGroup.value.id).subscribe(
        result => {
          this.companyService.unsetCompanyToken();
          this.userService.showToast('Firma wurde gelöscht');
        },
        error => {
          this.userService.showToast('Ups, da gibt es wohl ein Problem');
        },
        () => {
          this.router.navigate(['/admin-dashboard']);
        }
      );
    }
  }

  cancelForm() {
    this.router.navigate(['/admin-dashboard']);
  }
}
