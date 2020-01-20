import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, FormGroup } from '@angular/forms';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationFormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router) {
  }

  ngOnInit() {
    this.registrationFormGroup = this.fb.group({
      username: ['', Validators.required],
      firstname: [''],
      lastname: [''],
      password: ['', Validators.required],
      // passwordConfirm: ['', [Validators.required, this.passwordMatch()]]
      passwordConfirm: ['', Validators.required]
    });

    this.registrationFormGroup.setValidators(this.passwordMatch);

  }

  register() {
    const user = this.registrationFormGroup.value;
    this.userService.register(user).subscribe(
      (result) => {
        this.router.navigate(['/firma-form']);
        return result;
      }
    );
  }

  // passwordMatch(): ValidatorFn {
  //   return (control: AbstractControl): { [key: string]: any } | null => {
  //     const password = this.registrationFormGroup.get('password').value;
  //     console.log(password);

  //     return password;
  //     // const forbidden = /fuck/.test(control.value); // regex
  //     // return forbidden ? { 'badWord': { value: control.value } } : null;
  //   };
  // }

  // custom validator
  passwordMatch(group: FormGroup): any {
    // const birthYear = group.value.year_of_birth;

    const password = group.value.password;
    console.log(password);

    // const currentYear = new Date().getFullYear();
    // const age = currentYear - birthYear;

    // if (age < 18 && group.value.job === 'child') {
    //   return { notAdult: true };
    // } else {
    //   return null;
    // }
  }
}
