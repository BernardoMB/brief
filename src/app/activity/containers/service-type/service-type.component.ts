import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { Router } from '@angular/router';
import { SetServiceAction } from '../../../store/actions';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.css']
})
export class ServiceTypeComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public explanation: string;

  public serviceId: number;

  constructor(private router: Router,
    private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.title = '¿Qué servicio ofreces?';
    this.subtitle = 'Selecciona la mejor opción para tu negocio';
    this.explanation = 'Ayúdanos a determinar el servicio'
    + ' que ofreces para lograr mejores resultados.';

    // TODO: El product id debe de ser dinamico.
    this.serviceId = 1;
  }

  public continue(): void {
    this.store.dispatch(new SetServiceAction(this.serviceId));
    this.router.navigate(['/../address']);
  }
}
