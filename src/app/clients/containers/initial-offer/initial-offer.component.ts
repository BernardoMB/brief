import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { TurnOffIsLoadingAction, TurnOnIsLoadingAction } from '../../../store/actions';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
declare var $: any;

@Component({
  selector: 'app-initial-offer',
  templateUrl: './initial-offer.component.html',
  styleUrls: ['./initial-offer.component.scss']
})
export class InitialOfferComponent implements OnInit {

  constructor(private router: Router, private location: Location, private store: Store<IApplicationState>) { }

  ngOnInit() {
    $('body').css('background', 'linear-gradient(45deg, #33a4bc 20%, #32b3aa 80%)');
    this.store.dispatch(new TurnOffIsLoadingAction());
  }

  public goBack(): void {
    this.location.back();
  }

  public getContainerStyle(): any {
    return {
      height: $('body').height() + 'px'
    };
  }

  public continue(): void {
    this.store.dispatch(new TurnOnIsLoadingAction());
    setTimeout(() => {
      this.router.navigate(['/offer/clients/adds']);
    }, 100);
  }
}
