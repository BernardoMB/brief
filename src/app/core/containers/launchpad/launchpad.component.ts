import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetHeaderTitleAction } from '../../../store/actions';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-launchpad',
  templateUrl: './launchpad.component.html',
  styleUrls: ['./launchpad.component.scss']
})
export class LaunchpadComponent implements OnInit {

  constructor(private router: Router, private store: Store<IApplicationState>) {
    const headerTitle = '¡Bienvenido!';
    this.store.dispatch(new SetHeaderTitleAction(headerTitle));
  }

  ngOnInit() {
    $('#carousel').carousel({
      pause: 'hover'
    });
    $('#carousel').on('slide.bs.carousel', (e) => {
      console.log(e.to);
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
    this.router.navigate(['/activity/generic']);
  }
}
