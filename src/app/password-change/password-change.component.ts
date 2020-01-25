import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  passwordFormGroup;
  passwordsMatch;

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
        : {isMatching: false};
    };
  }

  ngOnInit() {
    this.passwordFormGroup = this.fb.group(
      {
        id: [null],
        username: [{value: '', disabled: false}, [Validators.required, Validators.pattern('^[a-zA-Z0-9]*')]],
        groups: [null, Validators.required],
        password: [''],
        passwordConfirm: ['', [Validators.required, PasswordChangeComponent.matchValues('password')]]
      }
    );

    const data = this.route.snapshot.data;

    this.passwordFormGroup.patchValue(data.user);
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, {hover: false, constrainWidth: false});

    const select = document.querySelectorAll('select');
    M.FormSelect.init(select);

    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
  }

  saveForm() {
    const user = this.passwordFormGroup.value;
    delete user.passwordConfirm; // unnecessary

    if (user.password === '') {
      delete user.password;
    }

    this.userService.updateUser(user).subscribe(
      result => {
        this.userService.showToast('Passwort wurde geändert');
      },
      error => {
        this.userService.showToast('Ups, da gibt es wohl ein Problem');
      },
      () => {
        this.router.navigate(['/']);
      }
    );
  }

  cancelForm() {
    this.router.navigate(['/']);
  }

  // check if passwords match (just for visual X or check)
  passwordMatch() {
    const password = this.passwordFormGroup.value.password;
    const passwordConfirm = this.passwordFormGroup.value.passwordConfirm;

    if (password === passwordConfirm) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }

}
