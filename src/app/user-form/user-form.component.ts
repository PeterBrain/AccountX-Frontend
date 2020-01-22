import { UserService } from './../service/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userFormGroup = this.fb.group({
      id: [null],
      username: [{ value: '', disabled: false }, Validators.required],
      first_name: [''],
      last_name: [''],
      groups: [null, Validators.required],
      password: [''],
      passwordConfirm: ['', Validators.required]
    });

    // this.userFormGroup.setValidators(this.passwordMatch); // this one disables the button

    const data = this.route.snapshot.data;
    this.companyOptions = data.companyOptions;
    this.companyGroups = data.groupOptions;

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
          const message = 'Mitarbeiter ' + JSON.parse(JSON.stringify(response)).username + ' wurde geändert.';
          this.showToast(message);
          this.router.navigate(['/admin-dashboard']);
          return response;
        }
      );
    } else {
      this.userService.createUser(user).subscribe(
        (response) => {
          const message = 'Mitarbeiter ' + JSON.parse(JSON.stringify(response)).username + ' wurde erstellt.';
          this.showToast(message);
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
          this.showToast('Mitarbeiter gelöscht.');
          this.router.navigate(['/admin-dashboard']);
        }
      );
    }
  }

  cancelForm() {
    this.router.navigate(['/admin-dashboard']);
  }

  showToast(message: string) {
    M.toast({
      html: message,
      displayLength: 4000
    });
  }

  // custom validator if password is not empty and match
  passwordMatch(group: FormGroup): any {
    const password = group.value.password;
    const passwordConfirm = group.value.passwordConfirm;

    if (password !== '' && password === passwordConfirm) {
      return { passwordsMatch: true };
    } else {
      return { passwordsMatch: false };
    }
  }
}
