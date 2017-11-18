import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/';
import { Component, OnInit } from '@angular/core';
import { SetActivityAction } from '../../../store/actions';

@Component({
  selector: 'app-professional',
  templateUrl: './professional.component.html',
  styleUrls: ['./professional.component.css']
})
export class ProfessionalComponent implements OnInit {

  public title: String;
  public subtitle: String;
  public explanation: String;

  public selectedOption: number;

  public options: any[] = [
    {
      optionId: 0,
      imgUrl: './../../../assets/cards/pais.svg',
      cardTitle: 'Otra actividad',
      selected: false
    }
  ];

  constructor(private router: Router,
              private store: Store<IApplicationState>) {
  }

  ngOnInit() {
    this.title = 'Profesionista u oficio';
    this.subtitle = '';
    this.explanation = 'Si no ofreces servicios professionales o algún oficio, entonces marca la'
    + ' casilla \'Otra actividad\' y haz presiona en continuar.';
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

  public continue(): void {
    switch (this.selectedOption) {
      case 0:
        this.router.navigate(['/activity/generic']);
        break;
      case undefined:
        this.store.dispatch(new SetActivityAction(this.selectedOption));
        this.router.navigate(['/../address']);
        break;
      default:
        this.store.dispatch(new SetActivityAction(this.selectedOption));
        this.router.navigate(['/../address']);
    }
  }

}
