import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-initial-offer',
  templateUrl: './initial-offer.component.html',
  styleUrls: ['./initial-offer.component.css']
})
export class InitialOfferComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public continue(): void {
    console.log('Function not implemented');
  }
}
