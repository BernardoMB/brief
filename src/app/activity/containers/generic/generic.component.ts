import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { SetActivityAction, SetHeaderTitleAction, UserConfirmedAction } from '../../../store/actions';
import swal from 'sweetalert2';

@Component({
  selector: 'app-generic',
  templateUrl: './generic.component.html',
  styleUrls: ['./generic.component.css']
})
export class GenericComponent implements OnInit {

  // View variables
  public title: String;
  public subtitle: String;
  public explanation: String;

  public options: any[] = [
    {
      optionId: 1,
      imgUrl: './../../../assets/real/SelectProduct.jpg',
      cardTitle: 'Farica o vende un producto',
      selected: false
    }, {
      optionId: 2,
      imgUrl: './../../../assets/generic/service2.jpg',
      cardTitle: 'Ofrece algún servicio',
      selected: false
    }, {
      optionId: 3,
      imgUrl: './../../../assets/generic/profession.jpg',
      cardTitle: 'Profesionista u oficio',
      selected: false
    }, {
      optionId: 4,
      imgUrl: './../../../assets/generic/hotel.jpg',
      cardTitle: 'Hotel',
      selected: false
    }, {
      optionId: 5,
      imgUrl: './../../../assets/generic/restaurant.jpg',
      cardTitle: 'Restaurante',
      selected: false
    }
  ];
  public selectedOption: number;

  constructor(private router: Router, private store: Store<IApplicationState>) {
    const headerTitle = '¿Qué hace tu empresa?';
    this.store.dispatch(new SetHeaderTitleAction(headerTitle));
  }

  ngOnInit() {
    this.store.dispatch(new UserConfirmedAction());
    this.title = 'Selecciona la mejor opción para tu negocio';
    this.subtitle = null;
    this.explanation = 'Ayúdanos a determinar el giro de tu negocio para lograr resultados increíbles.';
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
    if (this.selectedOption === undefined) {
      swal({
        customClass: 'select-one-option-alert',
        type: 'warning',
        title: 'Selecciona una opción paara continuar',
        showCloseButton: false,
        focusConfirm: false,
        confirmButtonText: 'Hecho',
        buttonsStyling: false,
        confirmButtonClass: 'hecho-button'
      });
    } else {
      switch (this.selectedOption) {
        case 1:
          this.router.navigate(['/activity/product']);
          break;
        case 2:
          this.router.navigate(['/activity/service/industry']);
          break;
        case 3:
          this.router.navigate(['/activity/profession']);
          break;
        case 4:
          this.router.navigate(['/activity/hotel']);
          break;
        case 5:
          this.router.navigate(['/activity/restaurant']);
          break;
      }
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/activity/generic']);
  }
}
