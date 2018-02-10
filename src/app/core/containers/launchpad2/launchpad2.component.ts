import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetHeaderOpacityAction, SetHeaderTitleAction } from '../../../store/actions';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-launchpad2',
  templateUrl: './launchpad2.component.html',
  styleUrls: ['./launchpad2.component.scss']
})
export class Launchpad2Component implements OnInit {

  constructor(private store: Store<IApplicationState>, private router: Router) {
    const headerTitle = '¡Bienvenido!';
    this.store.dispatch(new SetHeaderTitleAction(headerTitle));
    this.store.dispatch(new SetHeaderOpacityAction(false));
  }

  ngOnInit() {
    $('body').css('background', 'linear-gradient(270deg, #33a4bc 20%, #32b3aa 80%)');
  }

  public goToGeneric(): void {
    $('#external-content').removeClass('show collapse');
    $('#external-content').addClass('collapse');
    this.router.navigate(['/activity/generic']);
  }

}
