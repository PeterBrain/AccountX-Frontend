import { GroupService } from './../service/group.service';
import { UserService } from './../service/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as M from 'materialize-css';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, AfterViewInit {
  userFormGroup;
  isData;
  companyOptions;
  companyGroups;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.userFormGroup = this.fb.group({
      id: [null],
      username: [{ value: '', disabled: false }, Validators.required],
      first_name: [''],
      last_name: [''],
      groups: [null, Validators.required],
      password: [''],
      passwordConfirm: ['', Validators.required], // [Validators.required, passwordMatch()]]
    });

    const data = this.route.snapshot.data;
    this.companyOptions = data.companyOptions;
    this.companyGroups = data.groupOptions;

    console.log(this.companyGroups);

    // check if there is actual data in the data object
    if (data.user) {
      this.isData = true;
    } else {
      this.isData = false;
    }

    // fill form if there is data
    if (data.user) {
      this.userFormGroup.patchValue(data.user);
    }

  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: false, constrainWidth: false });

    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);

    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
  }

  saveForm() {
    const user = this.userFormGroup.value;
    console.log(user);

    if (this.isData) {
      this.userService.updateUser(user).subscribe(
        (response) => {
          const message = JSON.parse(JSON.stringify(response)).username + ' geändert.';
          M.toast({ html: message });
          this.router.navigate(['/admin-dashboard']);
          return response;
        }
      );
    } else {
      this.userService.createUser(user).subscribe(
        (response) => {
          const message = JSON.parse(JSON.stringify(response)).username + ' erstellt.';
          M.toast({ html: message });
          this.router.navigate(['/admin-dashboard']);
          return response;
        }
      );
    }
  }

  deleteUser() {
    if (this.isData) {
      this.userService.deleteUser(this.userFormGroup.value.id).subscribe(
        (response) => {
          this.router.navigate(['/admin-dashboard']);
        }
      );
    }
  }

  cancelForm() {
    this.router.navigate(['/admin-dashboard']);
  }
}
