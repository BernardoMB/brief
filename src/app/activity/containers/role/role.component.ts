import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
//#region Services
  import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
//#endregion
//#region Interfaces
  import { IApplicationState } from '../../../store/models/app-state';
//#endregion
//#region Actions
//#endregion
//#region Mappers
//#endregion

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public title: String;
  public subtitle: String;
  public explanation: String;

  public selectedRole: number;

  public roles: any[] = [
    {
      roleId: 1,
      imgUrl: './../../../assets/cards/fabrica.svg',
      cardTitle: 'Frabrica, produce o maquila algún producto',
      selected: false
    }, {
      roleId: 2,
      imgUrl: './../../../assets/cards/Distribuye.svg',
      cardTitle: 'Distribuye productos al mayoreo',
      selected: false
    }, {
      roleId: 3,
      imgUrl: './../../../assets/cards/mayoreo.svg',
      cardTitle: 'Vende o renta productos al mayoreo',
      selected: false
    }, {
      roleId: 4,
      imgUrl: './../../../assets/cards/consumidor.svg',
      cardTitle: 'Vende o renta al público o consumidor final',
      selected: false
    }, {
      roleId: 5,
      imgUrl: './../../../assets/cards/CuentasConUnEstablecimiento.svg',
      cardTitle: 'Cuentas con un local para tus clientes',
      selected: false
    }, {
      roleId: 6,
      imgUrl: './../../../assets/cards/Profesionista.svg',
      cardTitle: 'Profesionista u oficios',
      selected: false
    }, {
      roleId: 7,
      imgUrl: './../../../assets/cards/servicios.svg',
      cardTitle: 'Servicios generados prestados por personas (No productos)',
      selected: false
    }, {
      roleId: 8,
      imgUrl: './../../../assets/cards/restaurante.svg',
      cardTitle: 'Es un restaurante',
      selected: false
    }, {
      roleId: 9,
      imgUrl: './../../../assets/cards/hotel.svg',
      cardTitle: 'Es un hotel',
      selected: false
    },
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
    this.title = '¿Qué hace tu empresa?';
    this.subtitle = 'Selecciona la mejor opción para tu negocio';
    this.explanation = 'Ayudanos a determinar el giro de tu negocio para lograr mejores resultados.';
    this.selectedRole = 0;
  }

  //#region Cards
    public getBoxShadowForCard(roleId: number): String {
      if (this.selectedRole === roleId) {
        return '0px 0px 0px 10px #21bcbd inset';
      }
      return null;
    }
    public assignRole(roleId: number): void {
      if (this.selectedRole === roleId) {
        this.selectedRole = 0;
      } else {
        this.selectedRole = roleId;
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

  public doSomething(): void { }

}
