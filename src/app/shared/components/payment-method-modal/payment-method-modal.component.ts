import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng-bootstrap/modal';

@Component({
  selector: 'brief-payment-method-modal',
  templateUrl: './payment-method-modal.component.html',
  styleUrls: ['./payment-method-modal.component.scss']
})
export class PaymentMethodModalComponent implements OnInit {
  @ViewChild('paymentMethodModal') modal: ModalDirective;
  @Input() membership: string;

  constructor() { }

  ngOnInit() {
    this.membership = '<<Membresia contratada>>';
  }

  public showModal(): void {
    this.modal.show();
  }

  public closeModal(): void {
    this.modal.hide();
  }
}
