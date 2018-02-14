import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetHeaderOpacityAction, SetHeaderTitleAction, SetHeaderImageAction, TurnOnIsLoadingAction } from '../../../store/actions';
import { Router } from '@angular/router';
import {RegisterModalComponent} from '../../../shared/components/register-modal/register-modal.component';
declare var $: any;

@Component({
  selector: 'app-launchpad2',
  templateUrl: './launchpad2.component.html',
  styleUrls: ['./launchpad2.component.scss']
})
export class Launchpad2Component implements OnInit, AfterViewInit {
  @ViewChild('registerModal') registerModal: RegisterModalComponent;

  constructor(private store: Store<IApplicationState>, private router: Router) {
    this.store.dispatch(new SetHeaderTitleAction('¡Bienvenido!'));
    this.store.dispatch(new SetHeaderImageAction(''));
    this.store.dispatch(new SetHeaderOpacityAction(false));
  }

  ngOnInit() {
    $('body').css('background', 'linear-gradient(270deg, #33a4bc 20%, #32b3aa 80%)');
  }

  ngAfterViewInit() {
    this.registerModal.showModal();
  }

  public goToGeneric(): void {
    this.store.dispatch(new TurnOnIsLoadingAction());
    $('#external-content').removeClass('show collapse');
    $('#external-content').addClass('collapse');
    this.router.navigate(['/activity/generic']);
  }

}
