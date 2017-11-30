import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SetActivityAction, SetLeadDataInfoAction } from '../../../store/actions';
import { Subscription } from 'rxjs';
import { ILead } from '../../../../shared/models/ILead';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit, OnDestroy {
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
  public title: String;
  public subtitle: String;
  public explanation: String;

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
    private store: Store<IApplicationState>,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // Get information from route params.
    this.source = this.activatedRoute.snapshot.params['source'];
    this.userData = this.activatedRoute.snapshot.params['userdata'];
    if (this.userData) {
      const userDataObject: ILead = JSON.parse(this.userData);
      this.name = userDataObject.fullName;
      this.store.dispatch(new SetLeadDataInfoAction(userDataObject));
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

    this.question = '¿Ofreces un servicio?';
    this.imgUrl = './../../../assets/cards/servicios.svg';

    this.title = 'Ofreces un servicio';
    this.subtitle = '';
    this.explanation = 'Si no ofreces algún tipo de servicio, entonces marca la'
    + ' casilla \'Otra actividad\' y haz presiona en continuar.';

    setTimeout(() => {
      this.confirmationModal.showModal();
    }, 0);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
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

  public continue(): void {
    switch (this.selectedOption) {
      case 0:
        this.router.navigate(['/activity/generic']);
        break;
      case undefined:
        this.store.dispatch(new SetActivityAction(this.selectedOption));
        this.router.navigate(['/../address']);
        break;
      default:
        this.store.dispatch(new SetActivityAction(this.selectedOption));
        this.router.navigate(['/../address']);
    }
  }

}
