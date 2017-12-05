import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetProductAction } from '../../../store/actions';
import { Subscription } from 'rxjs/Subscription';
import { ILead } from '../../../../shared/models/ILead';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import swal from 'sweetalert2';
import { LandedService } from '../../../core/services/landed.service';
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
  public imgUrl: string;

  // View variables
  public title: string;
  public subtitle: string;
  public explanation: string;
  public autoCompleteInputElement: HTMLElement;

  // Catalogo de productos
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

  public options: any[] = [
    {
      optionId: 0,
      imgUrl: './../../../assets/cards/pais.svg',
      cardTitle: 'Otra actividad',
      selected: false
    }
  ];
  public selectedOption: number;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private landedService: LandedService) { }

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
    this.imgUrl = './../../../assets/cards/mayoreo.svg';

    this.title = 'Selecciona el producto';
    this.subtitle = null;
    this.explanation = 'Ayúdanos a determinar el producto que vendes para lograr mejores resultados. Si no vendes un producto, entonces'
    + ' marca la casilla "Otra actividad" y presiona en "Siguiente".';

    this.autoCompleteInputElement = document.getElementById('product-input');
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
    this.autoCompleteInputElement.addEventListener('keyup', function(e) {
      if (e.which === 13 || e.keyCode === 13) {
        this.blur();
      }
    }, false);

    setTimeout(() => {
      /* this.landedService.landed
      .subscribe(landed => {
        console.log(landed);
        if (landed) {
          this.confirmationModal.showModal();
        }
      }); */
      this.confirmationModal.showModal();
    }, 0);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  //#region Confirmation Modal event binding
    /**
     * This function gets executed when the user confirmed.
     * @param {any} event
     * @memberof MakerComponent
     */
    public onUserConfirmed(event): void {
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
    console.log(this.selectedOption);
    console.log(this.selectedProduct);
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
      this.router.navigate([`/activity/product/eactivity/${this.source}/${this.userData}/${this.campaignId}/${this.selectedProduct.id}`]);
    } else if (this.selectedOption === 0 && this.selectedProduct === undefined) {
      this.router.navigate(['/activity/generic']);
    }
  }
}
