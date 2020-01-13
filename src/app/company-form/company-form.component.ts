import { ActivatedRoute } from '@angular/router';
import { UserService } from './../service/user.service';
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
    private userService: UserService
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
  }

  saveForm() {
    console.log(this.companyFormGroup.value.id);
  }

  deleteCompany(company) {
    const companyId = company.id;
    console.log(companyId);

    // this.userService.deleteCompany(companyId);
    // TODO: delete Company
  }
}
