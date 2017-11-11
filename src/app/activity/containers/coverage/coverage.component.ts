import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
//#region Services
  import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
//#endregion
//#region Interfaces
  import { IApplicationState } from '../../../store/models/app-state';
  import { IProfession } from '../../../../shared/models/IProfession';
//#endregion
//#region Actions
  import { GetAllProfessionsAction } from '../../../store/actions';
//#endregion
//#region Mappers
  import { mapStateToProfessions } from '../../../store/mappers/mapStateToProfessions';
//#endregion

@Component({
  selector: 'app-coverage',
  templateUrl: './coverage.component.html',
  styleUrls: ['./coverage.component.css']
})
export class CoverageComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public professions$: Observable<Array<IProfession>>;
  public selectedProfession;
  public title: String;
  public subtitle: String;
  public explanation: String;
  public imgUrl1: String;
  public cardTitle1: String;
  public imgUrl2: String;
  public cardTitle2: String;
  public isSalePoint: Boolean;

  constructor(private router: Router,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<IApplicationState>) {
    this.isLoading$ = this.store.select(state => state.uiState.isLoading);
    this.professions$ = this.store.select(state => mapStateToProfessions(state));
  }

  ngOnInit() {
    this.isLoading$.subscribe(isLoading => {
      if (isLoading) {
        this.startLoading();
      } else {
        this.completeLoading();
      }
    });
    this.title = '¿Cúal es tu cobertura?';
    this.subtitle = '';
    this.explanation = 'Ayudanos a determinar si ofreces tus servicios como un'
     + ' profesionista o si tienes algún local en donde ofreces tus servicios.';
    this.imgUrl1 = './../../../assets/cards/CuentasConUnEstablecimiento.svg';
    this.cardTitle1 = 'Cuentas con un local para tus clientes';
    this.imgUrl2 = './../../../assets/cards/ProfesionistaUOficios.svg';
    this.cardTitle2 = 'Profesionista u oficio';
    this.isSalePoint = true;
  }

  //#region Cards
    // Solution 1
    public getBorderForCard(isSalePoint: boolean): String {
      const borderStyle = '5px solid #21bcbd';
      if ((this.isSalePoint && isSalePoint) || (!this.isSalePoint && !isSalePoint)) {
        return borderStyle;
      }
      return null;
    }
    // Solution 2
    public getClassForCard(isSalePoint: boolean): String {
      const cardClass = 'card-selected';
      if ((this.isSalePoint && isSalePoint) || (!this.isSalePoint && !isSalePoint)) {
        return cardClass;
      }
      return null;
    }
    // Solution 3
    public getBoxShadowForCard(isSalePoint: boolean): String {
      const boxShadow = '0px 0px 0px 10px #21bcbd inset';
      if ((this.isSalePoint && isSalePoint) || (!this.isSalePoint && !isSalePoint)) {
        return boxShadow;
      }
      return null;
    }
    public assignCoverage(isSalePoint: boolean): void {
      if (isSalePoint) {
        this.isSalePoint = true;
      } else {
        this.isSalePoint = false;
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

  public doSomething(): void {
    if (this.isSalePoint) {
      this.isSalePoint = false;
    } else {
      this.isSalePoint = true;
    }
  }
}
