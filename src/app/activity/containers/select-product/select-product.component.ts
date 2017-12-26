import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetProductAction, UserConfirmedAction, SetHeaderTitleAction } from '../../../store/actions';
import { Subscription } from 'rxjs/Subscription';
import { ILead } from '../../../../shared/models/ILead';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import swal from 'sweetalert2';
import { LandedService } from '../../../core/services/landed.service';
import { Observable } from 'rxjs/Observable';
declare var $: any;

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
  styleUrls: ['./select-product.component.css']
})
export class SelectProductComponent implements OnInit, OnDestroy {
  @ViewChild('confirmationModal') confirmationModal: ConfirmationModalComponent;

  // Route params
  public source: number;
  public userData: string;
  public campaignId: number;
  public paramsSubscription: Subscription;

  // Modal variables
  public name: string;
  public question: string;
  public imgUrl2: string;

  // View variables
  public title: string;
  public subtitle: string;
  public explanation: string;
  public autoCompleteInputElement: HTMLElement;

  // Catalogo de productos
  // TODO: Esto tiene que ser un observable de los productos que se mandarán pedir al store.
  // Lo tiene que jalar el constructor.
  public productsArray: Array<any> = [
    {
      id: 11,
      key: 1,
      name: 'Pisos de madera 1'
    }, {
      id: 12,
      key: 2,
      name: 'Pisos de madera 2'
    }, {
      id: 13,
      key: 3,
      name: 'Pisos de madera 3'
    }, {
      id: 14,
      key: 4,
      name: 'Pisos de madera 4'
    }, {
      id: 15,
      key: 5,
      name: 'Pisos de madera 5'
    }, {
      id: 16,
      key: 6,
      name: 'Pisos de madera 6'
    }
  ];
  public selectedProduct: any;

  // TODO: Eliminar esto porque ya no es necesario.
  public options: any[] = [
    {
      optionId: 0,
      imgUrl: './../../../assets/cards/pais.svg',
      cardTitle: 'Otra actividad',
      selected: false
    }
  ];
  public selectedOption: number;

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  public imgUrl: String;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private landedService: LandedService,
    private store: Store<IApplicationState>) {
      const headerTitle = 'Selecciona el producto';
      this.store.dispatch(new SetHeaderTitleAction(headerTitle));
    }

  ngOnInit() {
    // Get information from route params.
    this.source = this.activatedRoute.snapshot.params['source'];
    this.userData = this.activatedRoute.snapshot.params['userdata'];
    if (this.userData) {
      const userDataObject: ILead = JSON.parse(this.userData);
      this.name = userDataObject.fullName;
    }
    this.campaignId = this.activatedRoute.snapshot.params['campaignid'];
    // The object this.route.params returns an observable on which we can subscribe.
    // I need to subscribe to this object to execute some code every time the value passed to the observable changes.
    // I dont need to subscribe to anything because once this component is loaded,
    // the url params wont change while being inside of this component.
    // This ubscription will always live on memory. and that is why we want to implement onDestroy to end up the subscription.
    this.paramsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      // This code will get executed every time the value passed to the observable params change.
      this.source = params['source'];
      this.userData = params['userdata'];
      if (this.userData) {
        this.name = JSON.parse(this.userData).fullName;
      }
      this.campaignId = params['campaignid'];
    });

    this.question = '¿Vendes algún producto?';
    this.imgUrl = './../../../assets/real/SelectProduct.jpg';
    this.imgUrl2 = './../../../assets/real/SelectProductModal.jpg';

    // Initilize view variables.
    this.title = 'Escribe el nombre del producto que ofreces';
    this.subtitle = null;
    this.explanation = 'Ayúdanos a determinar el producto que vendes para lograr mejores resultados. Si no vendes un producto, entonces'
    + ' marca la casilla "Otra actividad" y presiona en "Siguiente".';

    // Disable auto-complete-search text field when selecting an option.
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
      this.store.dispatch(new UserConfirmedAction());
      if (event) {
        // Execute some code.
      } else {
        // Redirect user to generic campaign
        this.router.navigate(['/activity/generic']);
      }
    }
  //#endregion

  public selectProduct($event): void {
    this.selectedOption = undefined;
    this.selectedProduct = $event;
    console.log(this.selectedProduct);
    document.getElementById('product-input').blur();
  }

  //#region Cards
    public getBoxShadowForCard(roleId: number): String {
      if (this.selectedOption === roleId) {
        return '0px 0px 0px 10px #21bcbd inset';
      }
      return null;
    }
    public assignRole(optionId: number): void {
      this.selectedProduct = undefined;
      if (this.selectedOption === optionId) {
        this.selectedOption = 0;
      } else {
        this.selectedOption = optionId;
      }
    }
  //#endregion

  public continue(): void {
    if (this.selectedOption === undefined && this.selectedProduct === undefined) {
      swal({
        customClass: 'select-one-option-alert',
        type: 'warning',
        title: 'Selecciona un producto o haz click en "Otra actividad".',
        showCloseButton: false,
        confirmButtonText: 'Hecho',
        buttonsStyling: false,
        confirmButtonClass: 'hecho-button'
      });
    } else if (this.selectedOption === undefined && this.selectedProduct) {
      const route = `/activity/product/eactivity/`
      + `${this.source}/${this.userData}/${this.campaignId}/${this.selectedProduct.id}`;
      this.router.navigate([route]);
    } else if (this.selectedOption === 0 && this.selectedProduct === undefined) {
      this.router.navigate(['/activity/generic']);
    }
  }

  public goToGeneric(): void {
    this.router.navigate(['/activity/generic']);
  }
}
