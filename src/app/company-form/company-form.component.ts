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
  id;

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
    // this.ownerOptions = data.ownerOptions;
    // this.categoryOptions = data.categoryOptions;

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

  deleteCompany(company) {
    const companyId = company.value.id;
    console.log(companyId);

    // this.userService.deleteCompany(companyId);
    // TODO: delete Company
  }
}
