import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AccountX';
  currentYear;

  constructor(public router: Router) {
  }

  ngOnInit() {
    console.log(this.router.url);

    this.currentYear = new Date().getFullYear().toString();
  }
}
