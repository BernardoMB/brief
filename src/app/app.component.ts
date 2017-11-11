import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';
//#region SocketsSupport
  import * as io from 'socket.io-client';
//#endregion
//#region Interfaces
  import { IApplicationState } from './store/models/app-state';
//#endregion

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
