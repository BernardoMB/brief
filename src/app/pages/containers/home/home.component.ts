import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RegisterModalComponent } from '../../../shared/components/register-modal/register-modal.component';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { TurnOnIsLoadingAction } from '../../../store/actions/uiState.actions';
declare var $: any;

@Component({
  selector: 'brief-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private store: Store<IApplicationState>, private router: Router) { }

  ngOnInit() {
    $('body').css('background', '-webkit-linear-gradient(left, #33a4bc, #32b3aa)');
  }

  ngAfterViewInit() {

  }

  public goToGeneric(): void {
    this.store.dispatch(new TurnOnIsLoadingAction());
    $('#external-content').removeClass('show collapse');
    $('#external-content').addClass('collapse');
    setTimeout(() => {
      this.router.navigate(['../details']);
    }, 100);
  }

  public redirect(event): void {
    setTimeout(() => {
      switch (event) {
        case 1:
          this.router.navigate(['/']);   
          break;
        case 2:
          this.router.navigate(['../details']);
          break;
        default:
          this.router.navigate(['/']);   
          break;
      }  
    }, 100);
  }

}
