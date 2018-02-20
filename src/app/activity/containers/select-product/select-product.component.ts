import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetProductAction,
  UserConfirmedAction,
  SetHeaderTitleAction,
  GetAllProductsAction,
  TurnOffIsLoadingAction,
  TurnOnIsLoadingAction } from '../../../store/actions';
import { Subscription } from 'rxjs/Subscription';
import { ILead } from '../../../../shared/models/ILead';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { IProduct } from '../../../shared/models/IProduct';
import { mapStateToProductsInfo } from '../../../store/mappers/mapStateToProductsInfo';
declare var $: any;
import * as io from 'socket.io-client';
import { CompleterData, CompleterService } from 'ng2-completer';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.scss']
})
export class SelectProductComponent implements OnInit, OnDestroy {
  @ViewChild('confirmationModal') confirmationModal: ConfirmationModalComponent;

  // Route params
  // Option 1
  /* public url: Observable<string>;
  public source: Observable<number>;
  public userData: Observable<string>;
  public campaignId: Observable<number>; */
  // Option 2 (Best practice)
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
  private suggestions$ = new Subject();

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  /* public products$: Observable<Array<IProduct>>;
  public productsub: Subscription;
  public productsArray: Array<any>; */
  public socket;
  public dataService: CompleterData;
  public selectedProduct: any;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IApplicationState>,
    private completerService: CompleterService) {
      this.store.dispatch(new SetHeaderTitleAction('Selecciona tu producto'));
      /* this.store.dispatch(new GetAllProductsAction());
      this.products$ = this.store.select(state => mapStateToProductsInfo(state));
      this.productsub = this.products$.subscribe(products => {
        this.productsArray = [];
        products.forEach((product: any) => {
          this.productsArray.push({
            id: product._id,
            name: product.name
          });
        });
      }); */
      this.socket = io();
      this.dataService = this.completerService.local([], 'name', 'name');
      this.socket.on('serverSuggestions', suggestions => {
        this.dataService = completerService.local(suggestions, 'name', 'name');
      });
    /*this.socket.on('serverSuggestions', suggestions => {
      this.suggestions$.next(suggestions);
      console.log(suggestions);
    });*/
    }

  ngOnInit() {
    this.store.dispatch(new TurnOffIsLoadingAction());
    // Option 1
    /* // Get information from route params.
    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params);
      // this.store.dispatch(new GetCampaignInfo(params.campaignId));
      // this.store.dispatch(new SetUserDataInfo(params.userData));
      // this.store.dispatch(new SetSource(params.source));
    });
    this.url = this.activatedRoute.url.map(segments => segments.join(''));
    this.source = this.activatedRoute.params.map(p => p.source);
    this.userData = this.activatedRoute.params.map(p => p.userdata);
    this.campaignId = this.activatedRoute.params.map(p => p.campaignid);
    // Do something with the values of the url params.
    this.source.subscribe(value => {
      if (value) {
        console.log('Source', value);
      } else {
        console.log('No sorce specified in url params');
      }
    });
    this.userData.subscribe(value => {
      if (value) {
        console.log('User data', JSON.parse(value));
        this.name = JSON.parse(value).fullName;
      } else {
        console.log('No user data specified in url params.');
      }
    });
    this.campaignId.subscribe(value => {
      if (value) {
        console.log('Campaign id', value);
      } else {
        console.log('No campaign id specified in url params.');
      }
    }); */
    // Option 2 (Best practice)
    // Get information from route params.
    this.source = this.activatedRoute.snapshot.params['source'];
    this.userData = this.activatedRoute.snapshot.params['userdata'];
    this.campaignId = this.activatedRoute.snapshot.params['campaignid'];
    if (this.userData) {
      const userDataObject: ILead = JSON.parse(this.userData);
      this.name = userDataObject.fullName;
    }
    // The object this.route.params returns an observable on which we can subscribe.
    // I need to subscribe to this object to execute some code every time the value passed to the observable changes.
    // I dont need to subscribe to anything because once this component is loaded,
    // the url params wont change while being inside of this component.
    // This ubscription will always live on memory. and that is why we want to implement onDestroy to end up the subscription.
    this.paramsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      // This code will get executed every time the value passed to the observable params change.
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
    this.imgUrlModal = './../../../assets/svg/generic/product-mau.svg';

    // Initilize view variables.
    this.title = 'Escribe el nombre del producto';
    this.subtitle = null;
    this.imgUrlFixed = './../../../assets/svg/generic/product-mau.svg';
    this.explanation = 'Ayúdanos a determinar el producto que vendes para lograr resultados increíbles. '
    + 'Busca el nombre de tu producto y presiona en "Siguiente". '
    + 'Si no vendes un producto, entonces presiona en "Otra actividad".';

    // Disable auto-complete-search text field when selecting an option.
    $('#completer').find('input').attr('id', 'product-input');
    let isUserClick = false;
    $('#product-input').on('mousedown', function(event) {
      isUserClick = true;
    });
    $('#product-input').on('focus', function(event) {
      if (!isUserClick) {
        this.blur();
      }
      isUserClick = false;
    });

    // Disable auto-complete-search text field when pressing enter key.
    this.autoCompleteInputElement = document.getElementById('product-input');
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

  public inputChange3(event): void {
    if (event.length > 2) {
      console.log('inputChange', event)
      this.socket.emit('clientGetProductsSuggestions', event);
    }
  }

  public onUserConfirmed(event): void {
    if (!event) {
      this.router.navigate(['/activity/generic']);
    }
  }

  public selectProduct(event): void {
    this.selectedProduct = event;
    // Blur search box input.
    document.getElementById('product-input').blur();
  }

  public continue(): void {
    console.log('Aqui si chido');
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
      console.log('B');
      this.store.dispatch(new TurnOnIsLoadingAction());
      setTimeout(() => {
        if (this.source === undefined || this.userData === undefined || this.campaignId === undefined) {
          const route = '/activity/product/eactivity/';
          this.router.navigate([route]);
        } else {
          const route = `/activity/product/eactivity/`
          + `${this.source}/${this.userData}/${this.campaignId}/${this.selectedProduct.id}`;
          this.router.navigate([route]);
        }
      }, 100);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/activity/generic']);
  }
}
