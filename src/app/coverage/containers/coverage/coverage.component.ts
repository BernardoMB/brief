import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { SetHeaderTitleAction } from '../../../store/actions';
import swal from 'sweetalert2';

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.css']
})
export class CoverageComponent implements OnInit {

  public title: String;
  public subtitle: String;
  public explanation: String;

  public options: any[] = [
    {
      optionId: 1,
      imgUrl: './../../../assets/cards/pais2.svg',
      cardTitle: 'En todo el país',
      selected: false
    }, {
      optionId: 2,
      imgUrl: './../../../assets/cards/estados2.svg',
      cardTitle: 'En otros estados',
      selected: false
    }, {
      optionId: 3,
      imgUrl: './../../../assets/cards/Local2.svg',
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
    this.title = 'Selecciona la cobertura de tu negocio';
    this.subtitle = null;
    this.explanation = 'Ayúdanos a determinar en dónde ofreces tus productos o servicios'
    + ' para lograr resultados increíbles. Selecciona una opción y presiona en "Siguiente".'
    + ' Si deseas comenzar desde el principio, presiona en "Volver a empezar".';
    this.selectedOption = 0;
  }

  // TODO: Quitar boton siguinete.
  //#region Cards
    public getBoxShadowForCard(roleId: number): String {
      if (this.selectedOption === roleId) {
        return '0px 0px 0px 10px #21bcbd inset';
      }
      return null;
    }
    public assignRole(optionId: number): void {
      if (this.selectedOption === optionId) {
        this.selectedOption = 0;
        setTimeout(() => {
          this.continue();
        }, 200);
      } else {
        this.selectedOption = optionId;
        setTimeout(() => {
          this.continue();
        }, 200);
      }
    }
  //#endregion

  /**
   * This function updates the App state and redirects the user to the
   * next view based on the selectedOption propperty.
   * @memberof MakerComponent
   */
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
      this.router.navigate(['/coverage/states']);
        break;
      default:
        this.router.navigate(['/../../offer/clients/initial']);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/activity/generic']);
  }
}
