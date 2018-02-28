import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { TurnOffIsLoadingAction, UserConfirmedAction, TurnOnIsLoadingAction, SetHeaderTitleAction, SetHeaderOpacityAction, SetHeaderImageAction } from '../../../store/actions/uiState.actions';
declare var $: any;

// TODO: Quitar boton siguinete.
@Component({
  selector: 'brief-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.scss']
})
export class GenericComponent implements OnInit {

  // View variables
  public title: String;
  public subtitle: String;
  public explanation: String;

  public options: any[] = [
    {
      optionId: 1,
      imgUrl: './../../../assets/images/svg/generic/product.svg',
      // imgUrl: '',
      cardTitle: 'Fabrica o vende un producto',
      selected: false
    }, {
      optionId: 2,
      imgUrl: './../../../assets/images/svg/generic/service.svg',
      // imgUrl: '',
      cardTitle: 'Ofrece algún servicio',
      selected: false
    }, {
      optionId: 3,
      imgUrl: './../../../assets/images/svg/generic/profession.svg',
      // imgUrl: '',
      cardTitle: 'Profesionista u oficio',
      selected: false
    }, {
      optionId: 4,
      imgUrl: './../../../assets/images/svg/generic/hotel.svg',
      // imgUrl: '',
      cardTitle: 'Hotel',
      selected: false
    }, {
      optionId: 5,
      imgUrl: './../../../assets/images/svg/generic/restaurant.svg',
      // imgUrl: '',
      cardTitle: 'Restaurante',
      selected: false
    }
  ];
  public selectedOption: number;

  constructor(private router: Router, private store: Store<IApplicationState>) {
    this.store.dispatch(new SetHeaderTitleAction('¿Qué hace tu empresa?'));
  }

  public prueba: Subscription;

  ngOnInit() {
    $('body').css('background', 'white');
    this.store.dispatch(new TurnOffIsLoadingAction());
    this.store.dispatch(new UserConfirmedAction());
    this.title = 'Selecciona la mejor opción para tu negocio';
    this.subtitle = null;
    this.explanation = 'Ayúdanos a determinar el giro de tu negocio para lograr resultados increíbles.';
  }

  public setSelectedOption(option): void {
    this.selectedOption = option;
    this.store.dispatch(new TurnOnIsLoadingAction());
    setTimeout(() => {
      if (this.selectedOption === undefined) {
        swal({
          customClass: 'select-one-option-alert',
          type: 'warning',
          title: 'Selecciona una opción para continuar',
          showCloseButton: false,
          focusConfirm: false,
          confirmButtonText: 'Hecho',
          buttonsStyling: false,
          confirmButtonClass: 'hecho-button'
        });
      } else {
        switch (this.selectedOption) {
          case 1:
            this.router.navigate(['/details/product']);
            break;
          case 2:
            this.router.navigate(['/details/service/industry']);
            break;
          case 3:
            this.router.navigate(['/details/profession']);
            break;
          case 4:
            this.router.navigate(['/details/hotel']);
            break;
          case 5:
            this.router.navigate(['/details/restaurant']);
            break;
        }
      }
    }, 100);
  }
}
