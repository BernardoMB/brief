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
  selector: 'brief-select-r-type',
  templateUrl: './select-r-type.component.html',
  styleUrls: ['./select-r-type.component.scss']
})
export class SelectRTypeComponent implements OnInit, OnDestroy {
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
  public autoCompleteInputElement: HTMLElement;
  public imgUrlFixed: String;

  // Catalogo de productos
  // TODO: Esto tiene que ser un observable de los productos que se mandarán pedir al store.
  // Lo tiene que jalar el constructor.
  public typesArray: Array<any> = [
    {
      id: 11,
      key: 1,
      name: 'Tipo 1'
    }, {
      id: 12,
      key: 2,
      name: 'Tipo 2'
    }, {
      id: 13,
      key: 3,
      name: 'Tipo 3'
    }, {
      id: 14,
      key: 4,
      name: 'Tipo 4'
    }, {
      id: 15,
      key: 5,
      name: 'Tipo 5'
    }, {
      id: 16,
      key: 6,
      name: 'Tipo 6'
    }
  ];
  public selectedType: any;

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IApplicationState>) {
      this.store.dispatch(new SetHeaderTitleAction('Selecciona el tipo de comida'));
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
    this.question = '¿Tu negocio es un restaurante?';
    // this.imgUrlModal = './../../../assets/real/SelectProductModal.jpg';
    this.imgUrlModal = './../../../assets/images/svg/generic/restaurant.svg';

    // Initilize view variables.
    this.title = 'Escribe el tipo de comida';
    this.subtitle = null;
    // this.imgUrlFixed = './../../../assets/generic/restaurant.jpg';
    this.imgUrlFixed = './../../../assets/images/svg/generic/restaurant.svg';
    this.explanation = 'Ayúdanos a determinar el tipo de comida que sirves para lograr resultados increíbles. '
    + 'Busca el tipo de comida y presiona en "Siguiente". '
    + 'Si tu negocio no es un restaurante, entonces presiona en "Otra actividad".';

    // Disable auto-complete-search text field when selecting an option.
    let isUserClick = false;
    $('#type-input').on('mousedown', function(event) {
      isUserClick = true;
    });
    $('#type-input').on('focus', function(event) {
      if (!isUserClick) {
        this.blur();
      }
      isUserClick = false;
    });

    // Disable auto-complete-search text field when pressing enter key.
    this.autoCompleteInputElement = document.getElementById('type-input');
    this.autoCompleteInputElement.addEventListener('keyup', function(e) {
      if (e.which === 13 || e.keyCode === 13) {
        this.blur();
      }
    }, false);

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
    if (!event) {
      this.router.navigate(['/details/generic']);
    }
  }

  public selectType($event): void {
    this.selectedType = $event;
    // Blur search box input.
    document.getElementById('type-input').blur();
  }

  public continue(): void {
    if (this.selectedType === undefined || this.selectedType === '') {
      swal({
        customClass: 'select-one-option-alert',
        type: 'warning',
        title: 'Selecciona un tipo de comida o presiona en "Otra actividad"',
        showCloseButton: false,
        confirmButtonText: 'Hecho',
        buttonsStyling: false,
        confirmButtonClass: 'hecho-button'
      });
    } else if (this.selectedType) {
      this.store.dispatch(new TurnOnIsLoadingAction());
      setTimeout(() => {
        if (this.source === undefined || this.userData === undefined || this.campaignId === undefined) {
          const route = '/details/restaurant/type/';
          this.router.navigate([route]);
        } else {
          const route = `/details/restaurant/type/`
          + `${this.source}/${this.userData}/${this.campaignId}/${this.selectedType.id}`;
          this.router.navigate([route]);
        }
      }, 100);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/details/generic']);
  }
}
