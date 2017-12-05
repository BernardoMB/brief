import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LandedService {

  /**
   * Este subject es para saber si el usuario tiene misiones.
   * @type {Subject<boolean>}
   * @memberof LandedService
   */
  public landed: Subject<boolean> = new Subject<boolean>();

  constructor() { }

}
