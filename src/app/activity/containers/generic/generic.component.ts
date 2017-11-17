import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.css']
})
export class GenericComponent implements OnInit {

  public title: String;
  public subtitle: String;
  public explanation: String;

  public selectedOption: number;

  public options: any[] = [
    {
      optionId: 1,
      imgUrl: './../../../assets/cards/fabrica.svg',
      cardTitle: 'Frabrica, produce o maquila algún producto',
      selected: false
    }, {
      optionId: 2,
      imgUrl: './../../../assets/cards/servicios.svg',
      cardTitle: 'Ofrece algún servicio',
      selected: false
    }, {
      optionId: 3,
      imgUrl: './../../../assets/cards/Profesionista.svg',
      cardTitle: 'Profesionista u oficio',
      selected: false
    }, {
      optionId: 4,
      imgUrl: './../../../assets/cards/Distribuye.svg',
      cardTitle: 'Distribuye productos al mayoreo',
      selected: false
    }, {
      optionId: 5,
      imgUrl: './../../../assets/cards/mayoreo.svg',
      cardTitle: 'Vende o renta productos al mayoreo',
      selected: false
    }, {
      optionId: 6,
      imgUrl: './../../../assets/cards/consumidor.svg',
      cardTitle: 'Vende o renta al público o consumidor final',
      selected: false
    }, {
      optionId: 7,
      imgUrl: './../../../assets/cards/CuentasConUnEstablecimiento.svg',
      cardTitle: 'Cuentas con un local para tus clientes',
      selected: false
    }, {
      optionId: 8,
      imgUrl: './../../../assets/cards/restaurante.svg',
      cardTitle: 'Es un restaurante',
      selected: false
    }, {
      optionId: 9,
      imgUrl: './../../../assets/cards/hotel.svg',
      cardTitle: 'Es un hotel',
      selected: false
    },
  ];

  constructor(private router: Router,
              private store: Store<IApplicationState>) {
  }

  ngOnInit() {
    this.title = '¿Qué hace tu empresa?';
    this.subtitle = 'Selecciona la mejor opción para tu negocio';
    this.explanation = 'Ayudanos a determinar el giro de tu negocio para lograr mejores resultados.';
    this.selectedOption = 0;
  }

  //#region Cards
    public getBoxShadowForCard(optionId: number): String {
      if (this.selectedOption === optionId) {
        return '0px 0px 0px 10px #21bcbd inset';
      }
      return null;
    }
    public assignRole(optionId: number): void {
      if (this.selectedOption === optionId) {
        this.selectedOption = 0;
      } else {
        this.selectedOption = optionId;
      }
    }
  //#endregion

  public continue(): void {
    switch (this.selectedOption) {
      case 0:
        alert('Selecciona una opcion para continuar.');
        break;
      case 1:
        this.router.navigate(['/activity/maker']);
        break;
      case 2:
        this.router.navigate(['/activity/service']);
        break;
      case 3:
        this.router.navigate(['/activity/professional']);
        break;
      default:
        this.router.navigate(['/../address']);
      }
  }

}
