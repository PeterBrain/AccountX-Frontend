import { UserService } from './../service/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-select',
  templateUrl: './company-select.component.html',
  styleUrls: ['./company-select.component.scss']
})
export class CompanySelectComponent implements OnInit {

  companies;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getCompanies().subscribe(
      (response) => {
        this.companies = response;
        console.log(this.companies);

      }
    )
  }

}
