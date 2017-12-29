import { Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LandedService } from '../../../core/services/landed.service';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetHeaderTitleAction, UserConfirmedAction } from '../../../store/actions';
import { ILead } from '../../../../shared/models/ILead';
declare var $: any;

@Component({
  selector: 'app-select-profession',
  templateUrl: './select-profession.component.html',
  styleUrls: ['./select-profession.component.css']
})
export class SelectProfessionComponent implements OnInit, OnDestroy {
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

  // Catalogo de profesiones
  // TODO: Esto tiene que ser un observable de los productos que se mandarán pedir al store.
  // Lo tiene que jalar el constructor.
  public professionsArray: Array<any> = [
    {
      id: 11,
      key: 1,
      name: 'Profesion 1'
    }, {
      id: 12,
      key: 2,
      name: 'Profesion 2'
    }, {
      id: 13,
      key: 3,
      name: 'Profesion 3'
    }, {
      id: 14,
      key: 4,
      name: 'Profesion 4'
    }, {
      id: 15,
      key: 5,
      name: 'Profesion 5'
    }, {
      id: 16,
      key: 6,
      name: 'Profesion 6'
    }
  ];
  public selectedProfession: any;

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private landedService: LandedService,
    private store: Store<IApplicationState>) {
      const headerTitle = 'Selecciona tu profesión';
      this.store.dispatch(new SetHeaderTitleAction(headerTitle));
    }

    ngOnInit() {
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
      this.question = '¿Eres profesionista?';
      this.imgUrlModal = './../../../assets/real/SelectProductModal.jpg';

      this.imgUrlFixed = './../../../assets/generic/profession.jpg';

      // Initilize view variables.
      this.title = 'Escribe tu profesión';
      this.subtitle = null;
      // TODO: Modificar instruccion.
      this.explanation = 'Ayúdanos a determinar la profesión que practicas para lograr resultados increíbles. '
      + 'Busca el nombre de tu profesión y presiona en "Siguiente". '
      + 'Si no eres profesionista, entonces presiona en "Otra actividad".';

      // Disable auto-complete-search text field when selecting an option.
      let isUserClick = false;
      $('#profession-input').on('mousedown', function(event) {
        isUserClick = true;
      });
      $('#profession-input').on('focus', function(event) {
        if (!isUserClick) {
          this.blur();
        }
        isUserClick = false;
      });

      // Disable auto-complete-search text field when pressing enter key.
      this.autoCompleteInputElement = document.getElementById('profession-input');
      this.autoCompleteInputElement.addEventListener('keyup', function(e) {
        if (e.which === 13 || e.keyCode === 13) {
          this.blur();
        }
      }, false);

      // Get confirmed variable from the store to know if I should show the confirmation modal.
      this.confirmed = this.store.select(state => state.storeData.confirmed)
        .subscribe(value => {
          if (!value) {
            setTimeout(() => {
              this.confirmationModal.showModal();
            }, 0);
          }
        });
    }

    ngOnDestroy() {
      this.paramsSubscription.unsubscribe();
      this.confirmed.unsubscribe();
    }

    //#region Confirmation Modal event binding
      public onUserConfirmed(event): void {
        // Tell the store that the user has already confirmed
        // when he first entered the app so the modal wont show again.
        this.store.dispatch(new UserConfirmedAction());
        if (event) {
          // Execute some code.
        } else {
          // Redirect user to generic campaign.
          this.router.navigate(['/activity/generic']);
        }
      }
    //#endregion

    /**
     * Get the selected product from the view.
     * @param {any} $event
     * @memberof SelectProductComponent
     */
    public selectProfession($event): void {
      this.selectedProfession = $event;
      console.log(this.selectedProfession);
      // Blur search box input.
      document.getElementById('profession-input').blur();
    }

    public continue(): void {
      if (this.selectedProfession === undefined) {
        swal({
          customClass: 'select-one-option-alert',
          type: 'warning',
          title: 'Selecciona una profesión o presiona en "Otra actividad"',
          showCloseButton: false,
          confirmButtonText: 'Hecho',
          buttonsStyling: false,
          confirmButtonClass: 'hecho-button'
        });
      } else if (this.selectedProfession) {
        if (this.source === undefined || this.userData === undefined || this.campaignId === undefined) {
          const route = '/activity/profession/specialty/';
          this.router.navigate([route]);
        } else {
          const route = `/activity/profession/specialty/`
          + `${this.source}/${this.userData}/${this.campaignId}/${this.selectedProfession.id}`;
          this.router.navigate([route]);
        }
      }
    }

    /**
     * Redirects user to the generic campaing.
     * @memberof SelectProductComponent
     */
    public goToGeneric(): void {
      this.router.navigate(['/activity/generic']);
    }

}
