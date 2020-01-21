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
  // passwordsMatch = {};



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
