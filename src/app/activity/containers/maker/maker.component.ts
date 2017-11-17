import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maker',
  templateUrl: './maker.component.html',
  styleUrls: ['./maker.component.css']
})
export class MakerComponent implements OnInit {

  public title: String;
  public subtitle: String;
  public explanation: String;

  public selectedOption: number;

  public options: any[] = [
    {
      optionId: 1,
      imgUrl: './../../../assets/cards/mayoreo.svg',
      cardTitle: 'Vende producto al mayoreo',
      selected: false
    }, {
      optionId: 2,
      imgUrl: './../../../assets/cards/consumidor.svg',
      cardTitle: 'Vende producto al menudeo',
      selected: false
    }, {
      optionId: 3,
      imgUrl: './../../../assets/cards/pais.svg',
      cardTitle: 'Otra actividad',
      selected: false
    }
  ];

  constructor(private router: Router,
              private store: Store<IApplicationState>) {
  }

  ngOnInit() {
    this.title = '¿Qué tipo de fabricante eres?';
    this.subtitle = 'Selecciona la mejor opción para tu negocio';
    this.explanation = 'Ayúdanos a determinar el tipo de fabricante que'
    + ' eres para lograr mejores resultados. Si no eres fabricante, entonces'
    + ' marca la casilla \'Otra actividad\' y presiona en continuar.';
    this.selectedOption = 0;
  }

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
      } else {
        this.selectedOption = optionId;
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
        alert('Selecciona una opcion para continuar.');
        break;
      case 3:
        this.router.navigate(['/activity/generic']);
        break;
      default:
        this.router.navigate(['/../address']);
    }
  }

}
