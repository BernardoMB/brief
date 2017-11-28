import { IApplicationState } from '../../../store/models/app-state';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SetActivityAction } from '../../../store/actions';
import { ILead } from '../../../../shared/models/ILead';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-maker',
  templateUrl: './maker.component.html',
  styleUrls: ['./maker.component.css']
})
export class MakerComponent implements OnInit {
  @ViewChild('confirmationModal') confirmationModal: ConfirmationModalComponent;

  // Route elements
  public url: Observable<string>;
  public source: Observable<number>;
  public userData: Observable<string>;
  public campaignId: Observable<number>;

  // Modal variables
  public name: string;
  public question: string;
  public imgUrl: string;

  // View variables
  public title: String;
  public subtitle: String;
  public explanation: String;

  public selectedOption: number;

  public options: any[] = [
    {
      optionId: 1,
      imgUrl: './../../../assets/cards/mayoreo.svg',
      cardTitle: 'Vende producto al mayoreo',
      selected: false
    }, {
      optionId: 2,
      imgUrl: './../../../assets/cards/consumidor.svg',
      cardTitle: 'Vende producto al menudeo',
      selected: false
    }, {
      optionId: 0,
      imgUrl: './../../../assets/cards/pais.svg',
      cardTitle: 'Otra actividad',
      selected: false
    }
  ];

  constructor(private router: Router,
    private store: Store<IApplicationState>,
    private activatedRoute: ActivatedRoute) {
      // Get route elements
      this.url = activatedRoute.url.map(segments => segments.join(''));
      this.source = activatedRoute.params.map(p => p.source);
      this.userData = activatedRoute.params.map(p => p.userdata);
      this.campaignId = activatedRoute.params.map(p => p.campaignid);
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
      });
      this.question = '¿Eres fabricante?';
      this.imgUrl = './../../../assets/cards/CuentasConUnEstablecimiento.svg';
  }

  ngOnInit() {
    // Routeing
    this.activatedRoute.params.subscribe((params: Params) => {
      // console.log(params);
      // this.store.dispatch(new GetCampaignInfo(params.campaignId));
      // this.store.dispatch(new SetUserDataInfo(params.userData));
      // this.store.dispatch(new SetSource(params.source));
    });

    this.title = '¿Qué tipo de fabricante eres?';
    this.subtitle = 'Selecciona la mejor opción para tu negocio';
    this.explanation = 'Ayúdanos a determinar el tipo de fabricante que'
    + ' eres para lograr mejores resultados. Si no eres fabricante, entonces'
    + ' marca la casilla \'Otra actividad\' y presiona en continuar.';

    setTimeout(() => {
      this.confirmationModal.showModal();
    }, 0);
  }

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

  /**
   * This function updates the App state and redirects the user to the
   * next view based on the selectedOption propperty.
   * @memberof MakerComponent
   */
  public continue(): void {
    switch (this.selectedOption) {
      case undefined:
        alert('Selecciona una opcion para continuar.');
        break;
      case 0:
        this.router.navigate(['/activity/generic']);
        break;
      default:
        // this.store.dispatch(new SetActivityTypeAction(this.selectedOption));
        this.router.navigate(['/../address']);
    }
  }

  //#region Confirmation Modal event binding
    /**
     * This function gets executed when the user confirmed.
     * @param {any} event
     * @memberof MakerComponent
     */
    public onUserConfirmed(event): void {
      if (event) {
        // Set activity
        this.store.dispatch(new SetActivityAction(1));
      } else {
        // Redirect user to generic campaign
        this.router.navigate(['/activity/generic']);
      }
    }
  //#endregion

  public chupala(): void {
    this.confirmationModal.showModal();
  }
}
