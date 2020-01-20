import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
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
      passwordConfirm: ['', [Validators.required, passwordMatch()]]
    });
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

  passwordMatch(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {

      const forbidden = /fuck/.test(control.value); // regex
      return forbidden ? { 'badWord': { value: control.value } } : null;
    };
  }
}
