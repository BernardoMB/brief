import { Component, OnInit, ViewChild } from '@angular/core';
import { AddExampleModalComponent } from '../../../shared/components/add-example-modal/add-example-modal.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { TurnOffIsLoadingAction, TurnOnIsLoadingAction } from '../../../store/actions';
declare var $: any;

@Component({
  selector: 'app-add-example',
  templateUrl: './add-example.component.html',
  styleUrls: ['./add-example.component.scss']
})
export class AddExampleComponent implements OnInit {
  @ViewChild('addExampleModal') addExampleModal: AddExampleModalComponent;

  constructor(private router: Router, private location: Location, private store: Store<IApplicationState>) { }

  ngOnInit() {
    $('body').css('background', 'linear-gradient(45deg, #33a4bc 20%, #32b3aa 80%)');
    this.store.dispatch(new TurnOffIsLoadingAction());
  }

  public openModal(): void {
    this.addExampleModal.showModal();
  }

  public goBack(): void {
    this.location.back();
  }

  public continue(): void {
    this.store.dispatch(new TurnOnIsLoadingAction());
    setTimeout(() => {
      this.router.navigate(['/offer/clients/clients']);
    }, 100);
  }
}
