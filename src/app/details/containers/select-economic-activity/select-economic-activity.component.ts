import { Component, OnInit, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { Subscription } from 'rxjs/Subscription';
import { ILead } from '../../../../shared/models/ILead';
import swal from 'sweetalert2';
import { SetHeaderTitleAction, TurnOffIsLoadingAction, UserConfirmedAction, TurnOnIsLoadingAction } from '../../../store/actions/uiState.actions';

@Component({
  selector: 'brief-select-economic-activity',
  templateUrl: './select-economic-activity.component.html',
  styleUrls: ['./select-economic-activity.component.scss']
})
export class SelectEconomicActivityComponent implements OnInit, OnDestroy {
  @ViewChild('confirmationModal') confirmationModal: ConfirmationModalComponent;

  // Route params
  public source: number;
  public userData: string;
  public campaignId: number;
  public paramsSubscription: Subscription;

  // Modal variables
  public name: string;
  public question: string;
  public imgUrlModal: string;

  // View variables
  public title: String;
  public subtitle: String;
  public explanation: String;

  public options: any[] = [
    {
      optionId: 1,
      imgUrl: './../../../assets/images/svg/economic-activity/manufacture.svg',
      cardTitle: 'Fabrica el producto',
      selected: false
    }, {
      optionId: 2,
      imgUrl: './../../../assets/images/svg/economic-activity/distribute.svg',
      cardTitle: 'Fabrica y distribuye el producto al mayoreo',
      selected: false
    }, {
      optionId: 3,
      imgUrl: './../../../assets/images/svg/economic-activity/retail.svg',
      cardTitle: 'Fabrica y distribuye el producto al menudeo',
      selected: false
    }, {
      optionId: 4,
      imgUrl: './../../../assets/images/svg/economic-activity/distribute-minor.svg',
      cardTitle: 'Distribuye el producto al mayoreo',
      selected: false
    }, {
      optionId: 5,
      imgUrl: './../../../assets/images/svg/economic-activity/shop.svg',
      cardTitle: 'Distribuye el producto al menudeo',
      selected: false
    }
  ];
  public selectedOption: number;

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IApplicationState>) {
      this.store.dispatch(new SetHeaderTitleAction('¿Qué haces con el producto?'));
    }

  ngOnInit() {
    this.store.dispatch(new TurnOffIsLoadingAction());
    this.source = this.activatedRoute.snapshot.params['source'];
    this.userData = this.activatedRoute.snapshot.params['userdata'];
    if (this.userData) {
      const userDataObject: ILead = JSON.parse(this.userData);
      this.name = userDataObject.fullName;
    }
    this.campaignId = this.activatedRoute.snapshot.params['campaignid'];
    this.paramsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.source = params['source'];
      this.userData = params['userdata'];
      if (this.userData) {
        this.name = JSON.parse(this.userData).fullName;
      }
      this.campaignId = params['campaignid'];
    });

    this.title = '¿Qué actividad realizas con el producto?';
    this.subtitle = null;
    this.explanation = 'Ayúdanos a determinar el tipo de actividad'
    + ' que desempeñas con el producto para lograr resultados increíbles. Si no vendes un producto, entonces'
    + ' presiona en "Otra actividad".';

    // Modal logic
    this.question = '¿Vendes un producto?';
    this.imgUrlModal = './../../../assets/images/svg/generic/product.svg';
    // Get confirmed variable from the store to know if I should show the confirmation modal.
    this.confirmed = this.store.select(state => state.uiState.confirmed)
    .subscribe(value => {
      if (!value) {
        setTimeout(() => {
          this.confirmationModal.showModal();
          this.store.dispatch(new UserConfirmedAction());
        }, 0);
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.confirmed.unsubscribe();
  }

  public onUserConfirmed(event): void {
    if (!event) {
      this.router.navigate(['/details/generic']);
    }
  }

  public setSelectedOption(option): void {
    this.selectedOption = option;
    this.store.dispatch(new TurnOnIsLoadingAction());
    setTimeout(() => {
      this.continue();
    }, 100);
  }

  public continue(): void {
    switch (this.selectedOption) {
      case undefined:
      swal({
        customClass: 'select-one-option-alert',
        type: 'warning',
        title: 'Selecciona una opción o presiona en "Otra actividad"',
        showCloseButton: false,
        focusConfirm: false,
        confirmButtonText: 'Hecho',
        buttonsStyling: false,
        confirmButtonClass: 'hecho-button'
      });
      break;
      default:
      // TODO: Store the selected option in the store.
      this.router.navigate(['/details/address']);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/details/generic']);
  }
}
