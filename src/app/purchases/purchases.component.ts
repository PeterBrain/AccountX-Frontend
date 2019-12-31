import { Component, OnInit } from '@angular/core';

// makes jquery usable
declare var $: any;

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('.fixed-action-btn').floatingActionButton();
    $('select').formSelect();
  }

}
