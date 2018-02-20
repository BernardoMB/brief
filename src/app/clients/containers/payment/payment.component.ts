import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { TurnOffIsLoadingAction } from '../../../store/actions';
import { PaymentMethodModalComponent } from '../../../shared/components/payment-method-modal/payment-method-modal.component';
declare var $: any;

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, AfterViewInit {
  @ViewChild('paymentMethodModal') paymentMethodModal: PaymentMethodModalComponent;

  public numberOfLeads: number;
  public price: number;
  public label: string;
  public totalCost: number;
  public subscriptionType: String;
  public koomkinSubscriptionCost: number;
  public iva: number;
  public smallLetters: string;

  constructor(private router: Router, private location: Location, private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.store.dispatch(new TurnOffIsLoadingAction());
    $('body').css('background-color', '#ffffff');
    // TODO: Estas variables tienen que ir bindeadas a una propiedad del store.
    this.numberOfLeads = 35;
    this.price = 10;
    this.label = 'Suscripción';
    this.totalCost = 1;
    this.subscriptionType = 'PPL';
    this.koomkinSubscriptionCost = this.totalCost * (1 - 0.16);
    this.iva = 0.16;
    this.smallLetters = `Paga solo $${this.price}.°° (MNX) por cada cliente potencial,`
    + `el costo de inscripción es de $${this.totalCost}.°° (MNX) y el cargo se cobra,`
    + ` hasta el momento en que recibas ${this.numberOfLeads} prospectos, sin importar`
    + ` el tiempo que se necesite para cumplir esa meta.`;
  }

  ngAfterViewInit() {
    this.paymentMethodModal.showModal();
  }

  public goBack(): void {
    this.location.back();
  }

  public continue(): void {
    // TODO: implement this function
  }
}
