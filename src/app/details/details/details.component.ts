import { Component, OnInit } from '@angular/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { IApplicationState } from '../../store/models/app-state';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { SetHeaderTitleAction } from '../../store/actions/uiState.actions';
import { mapStateToHeaderTitle } from '../../store/mappers/mapStateToHeaderTitle';
import { mapStateToHeaderImgUrl } from '../../store/mappers/mapStateToHeaderImgUrl';
import { mapStateToHeaderOpacity } from '../../store/mappers/mapStateToHeaderOpacity';
import { Router } from '@angular/router';

@Component({
  selector: 'brief-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public titleSubscription: Subscription;
  public title: string;
  public imgUrl$: Observable<string>;
  public opacity$: Observable<boolean>;
  private isLoadingSubscription: Subscription;

  constructor(private slimLoadingBarService: SlimLoadingBarService,
    private store: Store<IApplicationState>,
    private router: Router) {
      this.titleSubscription = this.store.select(state => mapStateToHeaderTitle(state))
        .subscribe(value => {this.title = value});
      this.imgUrl$ = this.store.select(state => mapStateToHeaderImgUrl(state));
      this.opacity$ = this.store.select(state => mapStateToHeaderOpacity(state));
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

  public redirect(event): void {
    switch (event) {
      case 1:
        this.router.navigate(['/']);   
        break;
      case 2:
        this.router.navigate(['/details']);
        break;
      default:
        this.router.navigate(['/']);   
        break;
    }
  }

}
