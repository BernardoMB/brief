import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetHeaderTitleAction, SetHeaderImageAction } from '../../../store/actions';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth0.service';
declare var $: any;
import * as auth0 from 'auth0-js';

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent implements OnInit {

  public webAuth = new auth0.WebAuth({
    domain:       'bernardomb.auth0.com',
    clientID:     '25gB3nmB44C6FG9lAPA8REuBcnnCen0A'
  });

  constructor(private router: Router, private store: Store<IApplicationState>, public auth: AuthService) {
    this.store.dispatch(new SetHeaderTitleAction('¡Bienvenido!'));
    const headerImgUrl = '../../../../assets/headerImages/office.jpg';
    this.store.dispatch(new SetHeaderImageAction(headerImgUrl));
  }

  ngOnInit() {
    $('#carousel').carousel({
      pause: 'hover'
    });
    $('#carousel').on('slide.bs.carousel', (e) => {
      switch (e.to) {
        case 0:
          $('#one').css({'background-color': '#32b3aa'});
          $('#two').css({'background-color': '#f4f8fc'});
          $('#three').css({'background-color': '#f4f8fc'});
          break;
        case 1:
          $('#two').css({'background-color': '#32b3aa'});
          $('#one').css({'background-color': '#f4f8fc'});
          $('#three').css({'background-color': '#f4f8fc'});
          break;
        case 2:
          $('#three').css({'background-color': '#32b3aa'});
          $('#one').css({'background-color': '#f4f8fc'});
          $('#two').css({'background-color': '#f4f8fc'});
          break;
        }
    });

    $('#one').on('click', function() {
      $('#one').css({'background-color': '#32b3aa'});
      $('#two').css({'background-color': '#f4f8fc'});
      $('#three').css({'background-color': '#f4f8fc'});
    });
    $('#two').on('click', function() {
      $('#two').css({'background-color': '#32b3aa'});
      $('#one').css({'background-color': '#f4f8fc'});
      $('#three').css({'background-color': '#f4f8fc'});
    });
    $('#three').on('click', function() {
      $('#three').css({'background-color': '#32b3aa'});
      $('#one').css({'background-color': '#f4f8fc'});
      $('#two').css({'background-color': '#f4f8fc'});
    });
  }

  public goToGeneric(): void {
    $('#external-content').removeClass('show collapse');
    $('#external-content').addClass('collapse');
    this.router.navigate(['/activity/generic']);
  }
}
