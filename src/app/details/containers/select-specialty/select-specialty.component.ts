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

// TODO: Hay que contemplar que el profesionista puede no tener una especialdiad
// de manera que puede seleccionar ninguna especialidad.
@Component({
  selector: 'brief-select-specialty',
  templateUrl: './select-specialty.component.html',
  styleUrls: ['./select-specialty.component.scss']
})
export class SelectSpecialtyComponent implements OnInit, OnDestroy {
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
  public specialtiesArray: Array<any> = [
    {
      id: 10,
      key: 1,
      name: 'Sin especialidad' // TODO: Tiene que ser el valor por efecto del searchbox.
    },
    {
      id: 11,
      key: 1,
      name: 'Especialidad 1'
    }, {
      id: 12,
      key: 2,
      name: 'Especialidad 2'
    }, {
      id: 13,
      key: 3,
      name: 'Especialidad 3'
    }, {
      id: 14,
      key: 4,
      name: 'Especialidad 4'
    }, {
      id: 15,
      key: 5,
      name: 'Especialidad 5'
    }, {
      id: 16,
      key: 6,
      name: 'Especialidad 6'
    }
  ];
  public selectedSpecialty: any;

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IApplicationState>) {
      this.store.dispatch(new SetHeaderTitleAction('Selecciona tu especialidad'));
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
    this.question = '¿Practicas x profesión?';
    this.imgUrlModal = './../../../assets/images/svg/generic/profession-alt.svg';

    // Initilize view variables.
    this.title = 'Escribe la especialidad que tienes';
    this.subtitle = null;
    this.imgUrlFixed = './../../../assets/images/svg/generic/profession-alt.svg';
    this.explanation = 'Ayúdanos a determinar la especialidad que tienes para lograr mejores resultados. '
    + 'Busca tu especialidad y presiona en "Siguiente". '
    + 'Si no eres profesionista, entonces presiona en "Otra actividad".';

    // Disable auto-complete-search text field when selecting an option.
    let isUserClick = false;
    $('#specialty-input').on('mousedown', function(event) {
      isUserClick = true;
    });
    $('#specialty-input').on('focus', function(event) {
      if (!isUserClick) {
        this.blur();
      }
      isUserClick = false;
    });

    // Disable auto-complete-search text field when pressing enter key.
    this.autoCompleteInputElement = document.getElementById('specialty-input');
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

  public selectSpecialty($event): void {
    this.selectedSpecialty = $event;
    // Blur search box input.
    document.getElementById('specialty-input').blur();
  }

  public continue(): void {
    if (this.selectedSpecialty === undefined || this.selectedSpecialty === '') {
      swal({
        customClass: 'select-one-option-alert',
        type: 'warning',
        title: 'Selecciona una especialidad o presiona en "Otra actividad"',
        showCloseButton: false,
        confirmButtonText: 'Hecho',
        buttonsStyling: false,
        confirmButtonClass: 'hecho-button'
      });
    } else if (this.selectedSpecialty) {
      this.store.dispatch(new TurnOnIsLoadingAction());
      setTimeout(() => {
        if (this.source === undefined || this.userData === undefined || this.campaignId === undefined) {
          const route = '/details/address/';
          this.router.navigate([route]);
        } else {
          const route = `/details/address/`
          + `${this.source}/${this.userData}/${this.campaignId}/${this.selectedSpecialty.id}`;
          this.router.navigate([route]);
        }
      }, 100);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/details/generic']);
  }
}
