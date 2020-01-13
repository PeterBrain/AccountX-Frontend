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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userFormGroup = this.fb.group({
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
    if (data.user) {
      this.userFormGroup.patchValue(data.user);
    }
  }

  ngAfterViewInit() {
    const sidenav = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenav);

    const elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems, { hover: false, constrainWidth: false });

    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal);
  }

  saveForm() {
    const user = this.userFormGroup.value;
    let message;

    if (this.isData) {
      this.userService.updateUser(user).subscribe(
        (response) => {
          message = 'Mitarbeiter upgedatet.';
          // cannot call name of response?! works but linter doesnt like it
          // console.log(response.name);

          // alert shows twice, why?
          alert('Mitarbeiter upgedated.');
          return response;
        }
      );
    } else {
      this.userService.createUser(user).subscribe(
        (response) => {
          message = 'Mitarbeiter erstellt.';
          alert('Mitarbeiter erstellt.');
          return response;
        }
      );
    }

    this.router.navigate(['/admin-dashboard']);

    // does not return message, why?
    console.log(message);

    this.showToast(message);
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

  showToast(message) {
    // still no message
    console.log(message);
    M.toast({ html: 'I am a toast!' });
  }

}
