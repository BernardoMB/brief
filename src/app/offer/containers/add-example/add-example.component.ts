import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { TurnOffIsLoadingAction, TurnOnIsLoadingAction, SetOfferHeaderTitleAction } from '../../../store/actions/uiState.actions';
import { AddExampleModalComponent } from '../../../shared/components/add-example-modal/add-example-modal.component';
declare var $: any;

@Component({
  selector: 'brief-add-example',
  templateUrl: './add-example.component.html',
  styleUrls: ['./add-example.component.scss']
})
export class AddExampleComponent implements OnInit {
  @ViewChild('addExampleModal') addExampleModal: AddExampleModalComponent;

  constructor(private router: Router, private location: Location, private store: Store<IApplicationState>) {
    this.store.dispatch(new SetOfferHeaderTitleAction({title: ''}));
  }

  ngOnInit() {
    $('#app-body').css('background', '-webkit-linear-gradient(left, #33a4bc, #32b3aa)');
    this.store.dispatch(new TurnOffIsLoadingAction());
  }

  public openModal(): void {
    this.addExampleModal.showModal();
  }

  public continue(): void {
    this.store.dispatch(new TurnOnIsLoadingAction());
    setTimeout(() => {
      this.router.navigate(['/offer/clients']);
    }, 100);
  }
}
