import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { TurnOffIsLoadingAction, TurnOnIsLoadingAction, SetOfferHeaderTitleAction } from '../../../store/actions/uiState.actions';
import { PlansModalComponent } from '../../../shared/components/plans-modal/plans-modal.component';
declare var $: any;

@Component({
  selector: 'brief-clients-example',
  templateUrl: './clients-example.component.html',
  styleUrls: ['./clients-example.component.scss']
})
export class ClientsExampleComponent implements OnInit {
  @ViewChild('plansModal') plansModal: PlansModalComponent;

  constructor(private router: Router, private location: Location, private store: Store<IApplicationState>) {
    this.store.dispatch(new SetOfferHeaderTitleAction({ title: 'Tu empresa', size: '25px'}));    
  }

  ngOnInit() {
    $('#app-body').css('background', '#e8f0f9');
    this.store.dispatch(new TurnOffIsLoadingAction());
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

  public continue(election): void {
    this.store.dispatch(new TurnOnIsLoadingAction());
    setTimeout(() => {
      // TODO: implement this funciton correctly.
      $('#app-body').css('background-color', '#ffffff');
      this.router.navigate(['../payment']);
    }, 100);
  }

}
