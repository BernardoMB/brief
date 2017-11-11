import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.css']
})
export class CoverageComponent implements OnInit {

  public isLoading$: Observable<boolean>;

  public title: String;
  public subtitle: String;
  public explanation: String;

  public selectedOption: number;

  public options: any[] = [
    {
      optionId: 1,
      imgUrl: './../../../assets/cards/pais.svg',
      cardTitle: 'En todo el país',
      selected: false
    }, {
      optionId: 2,
      imgUrl: './../../../assets/cards/estados.svg',
      cardTitle: 'En otros estados',
      selected: false
    }, {
      optionId: 3,
      imgUrl: './../../../assets/cards/Local.svg',
      cardTitle: 'En tu localidad',
      selected: false
    }
  ];

  constructor(private router: Router,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<IApplicationState>) {
    this.isLoading$ = this.store.select(state => state.uiState.isLoading);
  }

  ngOnInit() {
    this.isLoading$.subscribe(isLoading => {
      if (isLoading) {
        this.startLoading();
      } else {
        this.completeLoading();
      }
    });
    this.title = '¿Cuál es tu cobertura?';
    this.explanation = 'Ayudanos a determinar en dónde ofreces tus servicios'
    + ' para lograr mejores resultados. Selecciona una opción y presiona en continuar.';
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

//#region Loading bar
    public startLoading(): void {
        this.slimLoadingBarService.start(() => {
            // Callback cuando se termina la carga
        });
    }
    public stopLoading(): void {
        this.slimLoadingBarService.stop();
    }
    public completeLoading(): void {
        this.slimLoadingBarService.complete();
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
    default:
      this.router.navigate(['/../products']);
  }
}

}
