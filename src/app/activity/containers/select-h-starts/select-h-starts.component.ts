import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetProductAction, UserConfirmedAction, SetHeaderTitleAction, TurnOffIsLoadingAction, TurnOnIsLoadingAction } from '../../../store/actions';
import { Subscription } from 'rxjs/Subscription';
import { ILead } from '../../../../shared/models/ILead';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
declare var $: any;

@Component({
  selector: 'app-select-h-starts',
  templateUrl: './select-h-starts.component.html',
  styleUrls: ['./select-h-starts.component.scss']
})
export class SelectHStartsComponent implements OnInit, OnDestroy {
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
    this.question = '¿Tu negocio es un hotel de paso x?';
    // this.imgUrlModal = './../../../assets/real/SelectProductModal.jpg';
    this.imgUrlModal = './../../../assets/svg/economic-activity/manufacture.svg';

    // Initilize view variables.
    this.title = 'Selecciona las estrellas de tu hotel';
    this.subtitle = null;
    // this.imgUrlFixed = './../../../assets/real/SelectProduct.jpg';
    this.imgUrlFixed = './../../../assets/svg/economic-activity/manufacture.svg';
    this.explanation = 'Ayúdanos a determinar el nivel de tu hotel para lograr resultados increíbles. '
    + 'Selecciona la cantidad de estrellas y presiona en "Siguiente". '
    + 'Si tu negocio no es un hotel, entonces presiona en "Otra actividad".';

    // Get confirmed variable from the store to know if I should show the confirmation modal.
    this.confirmed = this.store.select(state => state.storeData.confirmed)
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
      this.router.navigate(['/activity/generic']);
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
          const route = '/../address/';
          this.router.navigate([route]);
        } else {
          const route = `/../address/`
          + `${this.source}/${this.userData}/${this.campaignId}/${this.rating}`;
          this.router.navigate([route]);
        }
      }, 100);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/activity/generic']);
  }
}
