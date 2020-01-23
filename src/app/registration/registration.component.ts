import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from '../service/user.service';
import * as M from 'materialize-css';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationFormGroup;
  passwordsMatch;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) {
  }

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
    this.registrationFormGroup = this.fb.group({
      username: ['', Validators.required],
      first_name: [''],
      last_name: [''],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, RegistrationComponent.matchValues('password')]]
    });
  }

  register() {
    const user = this.registrationFormGroup.value;
    this.userService.register(user).subscribe(
      result => {
        const username = (JSON.parse(JSON.stringify(result))).username;
        this.showToast('Benutzer ' + username + ' wurde erstellt');
      },
      error => {
        this.showToast('Ups, da gibt es wohl ein Problem');
      },
      () => {
        this.router.navigate(['/firma-form']);
      }
    );
  }

  // check if passwords match (just for visual X or check)
  passwordMatch() {
    const password = this.registrationFormGroup.value.password;
    const passwordConfirm = this.registrationFormGroup.value.passwordConfirm;

    if (password !== '' && password === passwordConfirm) {
      this.passwordsMatch = true;
    } else {
      this.passwordsMatch = false;
    }
  }

  showToast(message: string) {
    M.toast({
      html: message,
      displayLength: 4000
    });
  }
}
