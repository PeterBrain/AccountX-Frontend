import { UserService } from './../service/user.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
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
  passwordsMatch;
  passwordIsNotPresent = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  // actual validator for password-match
  public static matchValues(
    matchTo: string
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  ngOnInit() {
    this.userFormGroup = this.fb.group(
      {
        id: [null],
        username: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*')]],
        first_name: [''],
        last_name: [''],
        groups: [null, Validators.required],
        password: [''],
        passwordConfirm: ['']
      }
    );

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
    } else {
      // this.userFormGroup.controls.password.setValidators([Validators.required, UserFormComponent.matchValues('passwordConfirm')]);
      this.userFormGroup.controls.passwordConfirm.setValidators([Validators.required, UserFormComponent.matchValues('password')]);
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
    delete user.passwordConfirm; // unnecessary

    if (user.password === '') {
      delete user.password;
    }

    if (this.isData) {
      this.userService.updateUser(user).subscribe(
        result => {
          // same as: response.name but linter does not like it this way
          const userName = JSON.parse(JSON.stringify(result)).username;
          this.userService.showToast('Mitarbeiter ' + userName + ' wurde geändert');
        },
        error => {
          this.userService.showToast('Ups, da gibt es wohl ein Problem');
        },
        () => {
          this.router.navigate(['/admin-dashboard']);
        }
      );
    } else {
      this.userService.createUser(user).subscribe(
        result => {
          const userName = JSON.parse(JSON.stringify(result)).username;
          this.userService.showToast('Mitarbeiter ' + userName + ' wurde erstellt');
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

  deleteUser() {
    if (this.isData) {
      this.userService.deleteUser(this.userFormGroup.value.id).subscribe(
        result => {
          this.userService.showToast('Mitarbeiter wurde gelöscht');
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

  // check if passwords match (just for visual X or check)
  passwordMatch() {
    const password = this.userFormGroup.value.password;
    const passwordConfirm = this.userFormGroup.value.passwordConfirm;

    if (password !== '' || passwordConfirm !== '') {
      this.passwordIsNotPresent = false;
    } else {
      this.passwordIsNotPresent = true;
    }

    if (!this.passwordIsNotPresent && password === passwordConfirm) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }
}
