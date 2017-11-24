import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { IApplicationState } from './store/models/app-state';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'app';

  constructor(private store: Store<IApplicationState>) { }

  public ngOnInit(): void { }

  public ngOnDestroy(): void { }

}
