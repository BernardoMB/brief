import { Component, OnInit } from '@angular/core';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetHeaderTitleAction, SetLeadDataInfoAction, TurnOnIsLoadingAction, TurnOffIsLoadingAction } from '../../../store/actions';
import { ILead } from '../../../../shared/models/ILead';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-select-service',
  templateUrl: './select-service.component.html',
  styleUrls: ['./select-service.component.scss']
})
export class SelectServiceComponent implements OnInit, OnDestroy {

  // Route params
  public source: number;
  public userData: string;
  public campaignId: number;
  public paramsSubscription: Subscription;

  public name: string;

  // View variables
  public title: string;
  public subtitle: string;
  public explanation: string;
  public autoCompleteInputElement: HTMLElement;
  public imgUrlFixed: String;

  // Catalogo de industrias
  // TODO: Esto tiene que ser un observable de las industrias que se mandaran pedir al store.
  // Lo tiene que jalar el constructor.
  public servicesArray: Array<any> = [
    {
      id: 11,
      key: 1,
      name: 'Service 1'
    }, {
      id: 12,
      key: 2,
      name: 'Service 2'
    }, {
      id: 13,
      key: 3,
      name: 'Service 3'
    }, {
      id: 14,
      key: 4,
      name: 'Service 4'
    }, {
      id: 15,
      key: 5,
      name: 'Service 5'
    }, {
      id: 16,
      key: 6,
      name: 'Service 6'
    }
  ];
  public selectedService: any;

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  constructor(private router: Router,
    private store: Store<IApplicationState>,
    private activatedRoute: ActivatedRoute) {
      this.store.dispatch(new SetHeaderTitleAction('Selecciona el servicio'));
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

    this.imgUrlFixed = './../../../assets/svg/economic-activity/manufacture.svg';

    // Initilize view variables.
    this.title = '¿Cuál es el servicio que ofreces?';
    this.subtitle = '';
    // TODO: Modificar instruccion.
    this.explanation = 'Ayúdanos a determinar el tipo de servicio que ofreces para lograr resultados increíbles. '
    + 'Busca el nombre del servicio y presiona en "Siguiente". '
    + 'Si no ofreces algún tipo de servicio, entonces presiona en "Otra actividad".';

    // Disable auto-complete-search text field when selecting an option.
    let isUserClick = false;
    $('#service-input').on('mousedown', function(event) {
      isUserClick = true;
    });
    $('#service-input').on('focus', function(event) {
      if (!isUserClick) {
        this.blur();
      }
      isUserClick = false;
    });

    // Disable auto-complete-search text field when pressing enter key.
    this.autoCompleteInputElement = document.getElementById('service-input');
    this.autoCompleteInputElement.addEventListener('keyup', function(e) {
      if (e.which === 13 || e.keyCode === 13) {
        this.blur();
      }
    }, false);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  public selectService($event): void {
    this.selectedService = $event;
    // Blur search box input.
    document.getElementById('service-input').blur();
  }

  public continue(): void {
    // Ir a direccion
    console.log(this.selectedService);
    if (this.selectedService === undefined || this.selectedService === '') {
      swal({
        customClass: 'select-one-option-alert',
        type: 'warning',
        title: 'Selecciona un servicio o presiona en "Otra actividad"',
        showCloseButton: false,
        confirmButtonText: 'Hecho',
        buttonsStyling: false,
        confirmButtonClass: 'hecho-button'
      });
    } else if (this.selectedService) {
      this.store.dispatch(new TurnOnIsLoadingAction());
      setTimeout(() => {
        if (this.source === undefined || this.userData === undefined || this.campaignId === undefined) {
          const route = '/../address/';
          this.router.navigate([route]);
        } else {
          const route = `/../address/`
          + `${this.source}/${this.userData}/${this.campaignId}/${this.selectedService.id}`;
          this.router.navigate([route]);
        }
      }, 100);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/activity/generic']);
  }
}
