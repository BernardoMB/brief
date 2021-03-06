import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { Subscription } from 'rxjs/Subscription';
import { ILead } from '../../../../shared/models/ILead';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { SetHeaderTitleAction, TurnOffIsLoadingAction, UserConfirmedAction, TurnOnIsLoadingAction } from '../../../store/actions/uiState.actions';
declare var $: any;

@Component({
  selector: 'brief-select-r-stars',
  templateUrl: './select-r-stars.component.html',
  styleUrls: ['./select-r-stars.component.scss']
})
export class SelectRStarsComponent implements OnInit, OnDestroy {
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
  public title: string;
  public subtitle: string;
  public explanation: string;
  public imgUrlFixed: String;
  public rating: any;

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IApplicationState>) {
      this.store.dispatch(new SetHeaderTitleAction('Selecciona tus estrellas'));
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

    // Initilize modal variables.
    this.question = '¿Tu negocio es de comida x?';
    // this.imgUrlModal = './../../../assets/real/SelectProductModal.jpg';
    this.imgUrlModal = './../../../assets/images/svg/generic/restaurant.svg';

    // Initilize view variables.
    this.title = 'Selecciona las estrellas de tu negocio';
    this.subtitle = null;
    // this.imgUrlFixed = './../../../assets/real/SelectProduct.jpg';
    this.imgUrlFixed = './../../../assets/images/svg/generic/restaurant.svg';
    this.explanation = 'Ayúdanos a determinar el nivel de tu restaurante para lograr resultados increíbles. '
    + 'Selecciona la cantidad de estrellas y presiona en "Siguiente". '
    + 'Si tu negocio no es un restaurante, entonces presiona en "Otra actividad".';

    // Get confirmed variable from the store to know if I should show the confirmation modal.
    this.confirmed = this.store.select(state => state.uiState.confirmed)
      .subscribe(value => {
        if (!value) {
          setTimeout(() => {
            this.confirmationModal.showModal();
            // Tell the store that the user has already confirmed
            // when he first entered the app so the modal wont show again.
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
    if (event) {
      this.router.navigate(['/details/generic']);
    }
  }

  public onStarClick(event): void {
    this.rating = event;
  }

  public continue(): void {
    if (this.rating === undefined) {
      swal({
        customClass: 'select-one-option-alert',
        type: 'warning',
        title: 'Selecciona las estrellas o presiona en "Otra actividad"',
        showCloseButton: false,
        confirmButtonText: 'Hecho',
        buttonsStyling: false,
        confirmButtonClass: 'hecho-button'
      });
    } else if (this.rating) {
      this.store.dispatch(new TurnOnIsLoadingAction());
      setTimeout(() => {
        if (this.source === undefined || this.userData === undefined || this.campaignId === undefined) {
          const route = '/details/address/';
          this.router.navigate([route]);
        } else {
          const route = `/details/address/`
          + `${this.source}/${this.userData}/${this.campaignId}/${this.rating}`;
          this.router.navigate([route]);
        }
      }, 100);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/details/generic']);
  }
}
