import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { SetHeaderTitleAction, TurnOffIsLoadingAction, TurnOnIsLoadingAction } from '../../../store/actions/uiState.actions';
declare var $: any;

@Component({
  selector: 'brief-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.scss']
})
export class CoverageComponent implements OnInit {

  public title: String;
  public subtitle: String;
  public explanation: String;

  public options: any[] = [
    {
      optionId: 1,
      imgUrl: './../../../assets/images/svg/coverage/pais.svg',
      cardTitle: 'En todo el país',
      selected: false
    }, {
      optionId: 2,
      imgUrl: './../../../assets/images/svg/coverage/estados.svg',
      cardTitle: 'En otros estados',
      selected: false
    }, {
      optionId: 3,
      imgUrl: './../../../assets/images/svg/coverage/local.svg',
      cardTitle: 'En tu localidad',
      selected: false
    }
  ];
  public selectedOption: number;

  constructor(private router: Router, private store: Store<IApplicationState>) {
    const headerTitle = '¿Cuál es tu cobertura?';
    this.store.dispatch(new SetHeaderTitleAction(headerTitle));
  }

  ngOnInit() {
    this.store.dispatch(new TurnOffIsLoadingAction());
    $('#app-body').css('background', 'white');
    this.title = 'Selecciona la cobertura de tu negocio';
    this.subtitle = null;
    this.explanation = 'Ayúdanos a determinar en dónde ofreces tus productos o servicios'
    + ' para lograr resultados increíbles. Selecciona una opción y presiona en "Siguiente".'
    + ' Si deseas comenzar desde el principio, presiona en "Volver a empezar".';
    this.selectedOption = 0;
  }

  public getBoxShadowForCard(roleId: number): String {
    if (this.selectedOption === roleId) {
      return '0px 0px 0px 10px #21bcbd inset';
    }
    return null;
  }

  public assignRole(optionId: number): void {
    if (this.selectedOption === optionId) {
      this.selectedOption = 0;
      this.store.dispatch(new TurnOnIsLoadingAction());
      setTimeout(() => {
        this.continue();
      }, 10000);
    } else {
      this.selectedOption = optionId;
      this.store.dispatch(new TurnOnIsLoadingAction());
      setTimeout(() => {
        this.continue();
      }, 100);
    }
  }

  public continue(): void {
    switch (this.selectedOption) {
      case 0:
        swal({
          customClass: 'select-one-option-alert',
          type: 'warning',
          title: 'Selecciona una opción o presiona en "Volver a empezar"',
          showCloseButton: false,
          confirmButtonText: 'Hecho',
          buttonsStyling: false,
          confirmButtonClass: 'hecho-button'
        });
        break;
      case 2:
      this.router.navigate(['/details/coverage/states']);
        break;
      default:
        this.router.navigate(['/../../offer/initial']);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/details/generic']);
  }
}
