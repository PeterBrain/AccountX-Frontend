import { Component, OnInit } from '@angular/core';

// makes jquery usable
declare var $: any;

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.fixed-action-btn').floatingActionButton();
  }

}
