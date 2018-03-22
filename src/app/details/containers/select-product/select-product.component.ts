import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {IApplicationState} from '../../../store/models/app-state';
import {Subscription} from 'rxjs/Subscription';
import {ILead} from '../../../../shared/models/ILead';
import {ConfirmationModalComponent} from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import swal from 'sweetalert2';
import {Observable} from 'rxjs/Observable';
import {IProduct} from '../../../shared/models/IProduct';
import * as io from 'socket.io-client';
import {CompleterData, CompleterService} from 'ng2-completer';
import {
  SetHeaderTitleAction,
  TurnOffIsLoadingAction,
  TurnOnIsLoadingAction,
  UserConfirmedAction
} from '../../../store/actions/uiState.actions';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {FormControl} from '@angular/forms';
import {startWith} from 'rxjs/operators';
import {map} from 'rxjs/operators';

declare var $: any;

@Component({
  selector: 'brief-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit, OnDestroy {
  @ViewChild('confirmationModal') confirmationModal: ConfirmationModalComponent;

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

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  public socket;

  // Auto Complete Input variables
  private selectedProduct: any;
  private filteredOptions: Observable<any>;
  private searchData$ = new Subject<any>();
  public myControl: FormControl = new FormControl();
  private autoCompleter: Subscription;
  private counter = 0;


  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private store: Store<IApplicationState>) {
    this.store.dispatch(new SetHeaderTitleAction('Selecciona tu producto'));
    this.socket = io();

  }

  ngOnInit() {

    this.socket.on('productSuggestions', suggestions => {
      console.log(suggestions);
      this.searchData$.next(suggestions);
    });

    this.autoCompleter = this.myControl.valueChanges
      .subscribe(event => {
        if (!event) return;
        console.log(event);
        if (event.length >= this.counter) {
          this.socket.emit('clientGetProductsSuggestions', event);
          this.counter++;
        } else {
          this.counter = event.length;
        }
      });

    this.filteredOptions = this.searchData$.asObservable();

    this.store.dispatch(new TurnOffIsLoadingAction());

    // Get information from route params.
    this.source = this.activatedRoute.snapshot.params['source'];
    this.userData = this.activatedRoute.snapshot.params['userdata'];
    this.campaignId = this.activatedRoute.snapshot.params['campaignid'];
    if (this.userData) {
      const userDataObject: ILead = JSON.parse(this.userData);
      this.name = userDataObject.fullName;
    }
    this.paramsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.source = params['source'];
      this.userData = params['userdata'];
      this.campaignId = params['campaignid'];
      if (this.userData) {
        const userDataObject: ILead = JSON.parse(this.userData);
        this.name = userDataObject.fullName;
      }
    });

    // Initilize modal variables.
    this.question = '¿Vendes algún producto?';
    this.imgUrlModal = './../../../assets/images/svg/generic/product.svg';

    // Initilize view variables.
    this.title = 'Escribe el nombre del producto';
    this.subtitle = null;
    this.imgUrlFixed = './../../../assets/images/svg/generic/product.svg';
    this.explanation = 'Ayúdanos a determinar el producto que vendes para lograr resultados increíbles. '
      + 'Busca el nombre de tu producto y presiona en "Siguiente". '
      + 'Si no vendes un producto, entonces presiona en "Otra actividad".';


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
    this.autoCompleter.unsubscribe();
  }

  public onUserConfirmed(event): void {
    if (!event) {
      this.router.navigate(['/details/generic']);
    }
  }

  public displayFn(product): string {
    return product ? product.name : product;
  }

  public continue(): void {
    if (this.selectedProduct === '' || this.selectedProduct === undefined) {
      swal({
        customClass: 'select-one-option-alert',
        type: 'warning',
        title: 'Selecciona un producto o presiona en "Otra actividad"',
        showCloseButton: false,
        confirmButtonText: 'Hecho',
        buttonsStyling: false,
        confirmButtonClass: 'hecho-button'
      });
    } else if (this.selectedProduct) {
      this.store.dispatch(new TurnOnIsLoadingAction());
      setTimeout(() => {
        if (this.source === undefined || this.userData === undefined || this.campaignId === undefined) {
          const route = '/details/product/eactivity/';
          this.router.navigate([route]);
        } else {
          const route = `/details/product/eactivity/`
            + `${this.source}/${this.userData}/${this.campaignId}/${this.selectedProduct.id}`;
          this.router.navigate([route]);
        }
      }, 100);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/details/generic']);
  }
}
