import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { TurnOffIsLoadingAction, TurnOnIsLoadingAction, SetOfferHeaderTitleAction } from '../../../store/actions/uiState.actions';
declare var $: any;

@Component({
  selector: 'brief-initial-offer',
  templateUrl: './initial-offer.component.html',
  styleUrls: ['./initial-offer.component.scss']
})
export class InitialOfferComponent implements OnInit {

  constructor(private router: Router, private store: Store<IApplicationState>) {
    this.store.dispatch(new SetOfferHeaderTitleAction({title: ''}));
  }

  ngOnInit() {
    $('#app-body').css('background', '-webkit-linear-gradient(left, #33a4bc, #32b3aa)');
    this.store.dispatch(new TurnOffIsLoadingAction());
  }
  
  public continue(): void {
    this.store.dispatch(new TurnOnIsLoadingAction());
    setTimeout(() => {
      this.router.navigate(['/offer/adds']);
    }, 100);
  }

}
