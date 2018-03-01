import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'brief-payment-card',
  templateUrl: './payment-card.component.html',
  styleUrls: ['./payment-card.component.scss']
})
export class PaymentCardComponent implements OnInit {

  public clicked: boolean;

  constructor() { }

  ngOnInit() {
  }

  public pene(): void {
    console.log('Se llamó');
    if (this.clicked) {
      this.clicked = false;
    } else {
      this.clicked = true;
    }
  }

}
