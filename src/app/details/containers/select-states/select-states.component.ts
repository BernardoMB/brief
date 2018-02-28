import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import swal from 'sweetalert2';
import { SetHeaderTitleAction, TurnOffIsLoadingAction, TurnOnIsLoadingAction } from '../../../store/actions/uiState.actions';
declare var $: any;

@Component({
  selector: 'brief-select-states',
  templateUrl: './select-states.component.html',
  styleUrls: ['./select-states.component.scss']
})
export class SelectStatesComponent implements OnInit {
  public title: String;
  public subtitle: String;
  public explanation: String;
  public selectedStates: Array<any> = [];
  public states: Array<any> = [
    {
      name: 'Aguascalientes'
    }, {
      name: 'Baja California'
    }, {
      name: 'Baja California Sur'
    }, {
      name: 'Campeche'
    }, {
      name: 'Chiapas'
    }, {
      name: 'Chihuahua'
    }, {
      name: 'Ciudad de México	'
    }, {
      name: 'Coahuila'
    }, {
      name: 'Colima'
    }, {
      name: 'Durango'
    }, {
      name: 'Guanajuato'
    }, {
      name: 'Guerrero'
    }, {
      name: 'Hidalgo'
    }, {
      name: 'Jalisco'
    }, {
      name: 'México'
    }, {
      name: 'Michoacán'
    }, {
      name: 'Morelos'
    }, {
      name: 'Nayarit'
    }, {
      name: 'Nuevo León'
    }, {
      name: 'Oaxaca'
    },  {
      name: 'Puebla'
    }, {
      name: 'Querétaro'
    }, {
      name: 'Quintana Roo'
    }, {
      name: 'San Luis Potosí'
    }, {
      name: 'Sinaloa'
    }, {
      name: 'Sonora'
    }, {
      name: 'Tabasco'
    }, {
      name: 'Tamaulipas'
    }, {
      name: 'Tlaxcala'
    },  {
      name: 'Veracruz'
    }, {
      name: 'Yucatán'
    }, {
      name: 'Zacatecas'
    }
  ];

  constructor(private router: Router, private store: Store<IApplicationState>) {
    const headerTitle = '¿Cuál es tu cobertura?';
    this.store.dispatch(new SetHeaderTitleAction(headerTitle));
  }

  ngOnInit() {
    $('#app-body').css('background', 'white');
    this.store.dispatch(new TurnOffIsLoadingAction());
    this.title = 'Selecciona los estados en donde tienes cobertura';
    this.subtitle = null;
    this.explanation = 'Ayúdanos a determinar en qué estados ofreces tus productos o servicios'
    + ' para lograr resultados increíbles. Selecciona una opción y presiona en "Siguiente".'
    + ' Si deseas comenzar desde el principio, presiona en "Volver a empezar".';
  }

  public continue(): void {
    if (this.selectedStates.length === 0) {
      swal({
        customClass: 'select-one-option-alert',
        type: 'warning',
        title: 'Selecciona al menos un estado o presiona en "Volver a empezar"',
        showCloseButton: false,
        confirmButtonText: 'Hecho',
        buttonsStyling: false,
        confirmButtonClass: 'hecho-button'
      });
    } else {
      this.store.dispatch(new TurnOnIsLoadingAction());
      setTimeout(() => {
        this.router.navigate(['/../../offer/initial']);
      }, 100);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/details/generic']);
  }

}
