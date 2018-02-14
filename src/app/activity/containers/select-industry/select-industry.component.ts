import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { ILead } from '../../../../shared/models/ILead';
import { SetLeadDataInfoAction,
  SetActivityAction,
  SetActivityTypeAction,
  SetHeaderTitleAction,
  UserConfirmedAction, 
  TurnOffIsLoadingAction,
  TurnOnIsLoadingAction} from '../../../store/actions';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-select-industry',
  templateUrl: './select-industry.component.html',
  styleUrls: ['./select-industry.component.scss']
})
export class SelectIndustryComponent implements OnInit, OnDestroy {
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

  // Catalogo de industrias
  // TODO: Esto tiene que ser un observable de las industrias que se mandaran pedir al store.
  // Lo tiene que jalar el constructor.
  public industriesArray: Array<any> = [
    {
      id: 11,
      key: 1,
      name: 'Industria 1'
    }, {
      id: 12,
      key: 2,
      name: 'Industria 2'
    }, {
      id: 13,
      key: 3,
      name: 'Industria 3'
    }, {
      id: 14,
      key: 4,
      name: 'Industria 4'
    }, {
      id: 15,
      key: 5,
      name: 'Industria 5'
    }, {
      id: 16,
      key: 6,
      name: 'Industria 6'
    }
  ];
  public selectedIndustry: any;

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  constructor(private router: Router,
    private store: Store<IApplicationState>,
    private activatedRoute: ActivatedRoute) {
      this.store.dispatch(new SetHeaderTitleAction('Selecciona tu industria'));
    }

  ngOnInit() {
    this.store.dispatch(new TurnOffIsLoadingAction());
    // Get information from route params.
    this.source = this.activatedRoute.snapshot.params['source'];
    this.userData = this.activatedRoute.snapshot.params['userdata'];
    if (this.userData) {
      const userDataObject: ILead = JSON.parse(this.userData);
      this.name = userDataObject.fullName;
      this.store.dispatch(new SetLeadDataInfoAction(userDataObject));
    }
    this.campaignId = this.activatedRoute.snapshot.params['campaignid'];

    this.paramsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      // This code will get executed every time the value passed to the observable params change.
      this.source = params['source'];
      this.userData = params['userdata'];
      if (this.userData) {
        this.name = JSON.parse(this.userData).fullName;
      }
      this.campaignId = params['campaignid'];
    });

    // Initilize modal variables.
    this.question = '¿Ofreces un servicio?';
    this.imgUrlModal = './../../../assets/svg/economic-activity/manufacture.svg';

    // Initilize view variables.
    this.title = '¿A qué industria pertenece tu servicio?';
    this.subtitle = '';
    this.imgUrlFixed = './../../../assets/svg/economic-activity/manufacture.svg';
    this.explanation = 'Ayúdanos a determinar el tipo de servicio que ofreces'
    + ' para lograr resultados increibles. Si no ofreces algún tipo de servicio, entonces'
    + ' presiona en "Otra actividad".';

    // Disable auto-complete-search text field when selecting an option.
    let isUserClick = false;
    $('#industry-input').on('mousedown', function(event) {
      isUserClick = true;
    });
    $('#industry-input').on('focus', function(event) {
      if (!isUserClick) {
        this.blur();
      }
      isUserClick = false;
    });

    // Disable auto-complete-search text field when pressing enter key.
    this.autoCompleteInputElement = document.getElementById('industry-input');
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
      this.router.navigate(['/activity/generic']);
    }
  }

  public selectIndustry($event): void {
    this.selectedIndustry = $event;
    // Blur search box input.
    document.getElementById('industry-input').blur();
  }

  public continue(): void {
    if (this.selectedIndustry === undefined || this.selectedIndustry === '') {
      swal({
        customClass: 'select-one-option-alert',
        type: 'warning',
        title: 'Selecciona una industria o presiona en "Otra actividad"',
        showCloseButton: false,
        confirmButtonText: 'Hecho',
        buttonsStyling: false,
        confirmButtonClass: 'hecho-button'
      });
    } else if (this.selectedIndustry) {
      this.store.dispatch(new TurnOnIsLoadingAction);
      setTimeout(() => {
        if (this.source === undefined || this.userData === undefined || this.campaignId === undefined) {
          const route = '/activity/service/';
          this.router.navigate([route]);
        } else {
          const route = `/activity/service/`
          + `${this.source}/${this.userData}/${this.campaignId}/${this.selectedIndustry.id}`;
          this.router.navigate([route]);
        }
      }, 100);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/activity/generic']);
  }
}
