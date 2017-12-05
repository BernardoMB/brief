import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetProductAction } from '../../../store/actions';
import { Subscription } from 'rxjs/Subscription';
import { ILead } from '../../../../shared/models/ILead';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import swal from 'sweetalert2';

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

  // Slected product
  public productId: number;

  // Catalogo de productos
  public productsArray: Array<string> = [
    'Pisos de madera',
    'Cubetas de plástico'
  ];
  public myData;

  public selectedOption: number;

  public options: any[] = [
    {
      optionId: 0,
      imgUrl: './../../../assets/cards/pais.svg',
      cardTitle: 'Otra actividad',
      selected: false
    }
  ];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

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

    setTimeout(() => {
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

  //#region Cards
    public getBoxShadowForCard(roleId: number): String {
      if (this.selectedOption === roleId) {
        return '0px 0px 0px 10px #21bcbd inset';
      }
      return null;
    }
    public assignRole(optionId: number): void {
      if (this.selectedOption === optionId) {
        this.selectedOption = 0;
      } else {
        this.selectedOption = optionId;
      }
    }
  //#endregion

  public continue(): void {
    this.selectedOption = 2;
    this.productId = 1;
    switch (this.selectedOption) {
      case undefined:
        swal({
          customClass: 'select-one-option-alert',
          type: 'warning',
          title: 'Selecciona una opción',
          showCloseButton: false,
          confirmButtonText: 'Hecho',
          buttonsStyling: false,
          confirmButtonClass: 'hecho-button'
        });
        break;
      case 0:
        this.router.navigate(['/activity/generic']);
        break;
      default:
        if (this.productId) {
          this.router.navigate([`/activity/product/${this.source}/${this.userData}/${this.campaignId}/${this.productId}`]);
        } else {
          swal({
            customClass: 'select-one-option-alert',
            type: 'warning',
            title: 'Selecciona un producto para continuar o marca la casilla "Otra actividad".',
            showCloseButton: false,
            confirmButtonText: 'Hecho',
            buttonsStyling: false,
            confirmButtonClass: 'hecho-button'
          });
        }
    }
  }

  public myCallback($event): void {
    console.log('My data event passed to myCallback function', $event);
    console.log('My data printing myData ngModel', this.myData);
  }
}
