import { Component, OnInit, ViewChild } from '@angular/core';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { Subscription } from 'rxjs/Subscription';
import { ILead } from '../../../../shared/models/ILead';
import swal from 'sweetalert2';
import { SetHeaderTitleAction, UserConfirmedAction } from '../../../store/actions';

@Component({
  selector: 'app-select-economic-activity',
  templateUrl: './select-economic-activity.component.html',
  styleUrls: ['./select-economic-activity.component.css']
})
export class SelectEconomicActivityComponent implements OnInit, OnDestroy {
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
  public title: String;
  public subtitle: String;
  public explanation: String;

  public options: any[] = [
    {
      optionId: 1,
      imgUrl: './../../../assets/real/FabricaElProducto.jpg',
      cardTitle: 'Fabrica el producto',
      selected: false
    }, {
      optionId: 2,
      imgUrl: './../../../assets/real/FabYDistAlMayoreo.jpeg',
      cardTitle: 'Fabrica y distribuye el producto al mayoreo',
      selected: false
    }, {
      optionId: 3,
      imgUrl: './../../../assets/real/FabYDistAlMenudeo.jpg',
      cardTitle: 'Fabrica y distribuye el producto al menudeo',
      selected: false
    }, {
      optionId: 4,
      imgUrl: './../../../assets/real/Mayoreo.jpg',
      cardTitle: 'Distribuye el producto al mayoreo',
      selected: false
    }, {
      optionId: 5,
      imgUrl: './../../../assets/real/Menudeo.jpg',
      cardTitle: 'Distribuye el producto al menudeo',
      selected: false
    }
  ];
  public selectedOption: number;

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IApplicationState>) {
      const headerTitle = '¿Qué haces con el producto?';
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

    this.question = '¿Vendes un producto?';
    this.imgUrlModal = './../../../assets/real/SelectEActivityModal.jpg';

    this.title = '¿Qué actividad realizas con el producto?';
    this.subtitle = null;
    this.explanation = 'Ayúdanos a determinar el tipo de actividad'
    + ' que desempeñas con el producto para lograr resultados increíbles. Si no vendes un producto, entonces'
    + ' presiona en "Otra actividad".';

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

  //#region Cards
    public getBoxShadowForCard(roleId: number): String {
      if (this.selectedOption === roleId) {
        return '0px 0px 0px 10px #32b3aa inset';
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

  //#region Confirmation Modal event binding
    /**
     * This function gets executed when the user confirmed.
     * @param {any} event
     * @memberof MakerComponent
     */
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

  /**
   * This function updates the App state and redirects the user to the
   * next view based on the selectedOption propperty.
   * @memberof MakerComponent
   */
  public continue(): void {
    switch (this.selectedOption) {
      case undefined:
        swal({
          customClass: 'select-one-option-alert',
          type: 'warning',
          title: 'Selecciona una opción o presiona en "Otra actividad"',
          showCloseButton: false,
          focusConfirm: false,
          confirmButtonText: 'Hecho',
          buttonsStyling: false,
          confirmButtonClass: 'hecho-button'
        });
        break;
      default:
        // TODO: Write to the store with the selected option.
        this.router.navigate(['/../address']);
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
