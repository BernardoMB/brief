import { Component, OnDestroy, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  constructor() { }

  public ngOnInit(): void { }

  public ngOnDestroy(): void { }

}
