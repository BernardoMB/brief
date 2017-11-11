import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public title: String;
  public subtitle: String;
  public explanation: String;

  public selectedOption: number;

  public options: any[] = [
    {
      optionId: 1,
      imgUrl: './../../../assets/cards/pais.svg',
      cardTitle: 'Otra actividad',
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
    this.title = 'Ofreces un servicio';
    this.subtitle = '';
    this.explanation = 'Si no ofreces algún tipo de servicio, entonces marca la'
    + ' casilla \'Otra actividad\' y haz presiona en continuar.';
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

  public continue(): void {
    switch (this.selectedOption) {
      case 0:
        this.router.navigate(['/../address']);
        break;
      case 1:
        this.router.navigate(['/activity/generic']);
        break;
      default:
        this.router.navigate(['/../address']);
    }
  }

}
