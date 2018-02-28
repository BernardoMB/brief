import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IApplicationState } from '../../store/models/app-state';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { mapStateToOfferHeaderTitle, mapStateToOfferHeaderTitleSize } from '../../store/mappers/mapStateToHeaderTitle';
import { Subscription } from 'rxjs';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

@Component({
  selector: 'brief-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  
  public title: Observable<string>;
  public titleSizeSubscription: Subscription;
  public titleSize: string;

  private isLoadingSubscription: Subscription;

  constructor(private store: Store<IApplicationState>, private location: Location, private slimLoadingBarService: SlimLoadingBarService) {
    this.title = this.store.select(state => mapStateToOfferHeaderTitle(state));
    this.titleSizeSubscription = this.store.select(state => mapStateToOfferHeaderTitleSize(state))
        .subscribe(value => {
          this.titleSize = value
        });
  }

  ngOnInit() {
    this.isLoadingSubscription = this.store.select(state => state.uiState.isLoading)
    .subscribe((isLoading: boolean) => isLoading ? this.startLoading() : this.completeLoading()); 
  }

  public startLoading(): void {
    this.slimLoadingBarService.start();
  }
  public stopLoading(): void {
      this.slimLoadingBarService.stop();
  }
  public completeLoading(): void {
      this.slimLoadingBarService.complete();
  }

  public goBack(): void {
    this.location.back();
  }
  
  public getHeaderFontSize(): any {
    return {
      fontSize: this.titleSize
    };
  }
}
