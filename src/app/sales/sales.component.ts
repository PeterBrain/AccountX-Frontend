import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// makes jquery usable
declare var $: any;

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    console.log(this.router.url);

    $('.fixed-action-btn').floatingActionButton();
  }

}
