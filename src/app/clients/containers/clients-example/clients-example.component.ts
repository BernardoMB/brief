import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { PlansModalComponent } from '../../../shared/components/plans-modal/plans-modal.component';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { TurnOffIsLoadingAction, TurnOnIsLoadingAction } from '../../../store/actions';
declare var $: any;

@Component({
  selector: 'app-clients-example',
  templateUrl: './clients-example.component.html',
  styleUrls: ['./clients-example.component.scss']
})
export class ClientsExampleComponent implements OnInit {
  @ViewChild('plansModal') plansModal: PlansModalComponent;

  public companyName: string;

  constructor(private router: Router, private location: Location, private store: Store<IApplicationState>) {
    this.companyName = 'Tu empresa';
  }

  ngOnInit() {
    this.store.dispatch(new TurnOffIsLoadingAction());
    $('body').css('background-color', '#e8f0f9');
    $('#myCarousel').carousel({
      interval: false
    });
    $('#uno').on('click', function() {
      $('#uno').css({'background-color': '#32b3aa'});
      $('#dos').css({'background-color': '#f4f8fc'});
    });
    $('#dos').on('click', function() {
      $('#dos').css({'background-color': '#32b3aa'});
      $('#uno').css({'background-color': '#f4f8fc'});
    });
  }

  /**
   * Esta función abre el modal en donde se especifican los planes disponibles para el usuario.
   * @memberof ClientsExampleComponent
   */
  public showPlans(): void {
    this.plansModal.showModal();
  }

  public goBack(): void {
    $('body').css('background-color', '#ffffff');
    this.location.back();
  }

  public continue(election): void {
    this.store.dispatch(new TurnOnIsLoadingAction());
    setTimeout(() => {
      // TODO: implement this funciton correctly.
      $('body').css('background-color', '#ffffff');
      this.router.navigate(['/offer/clients/payment']);
    }, 100);
  }

}
