import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetProductAction } from '../../../store/actions';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.css']
})
export class ProductTypeComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public explanation: string;

  public productId: number;

  constructor(private router: Router,
    private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.title = '¿Qué haces con el producto?';
    this.subtitle = 'Selecciona la mejor opción para tu negocio';
    this.explanation = 'Ayúdanos a determinar el tipo de actividad'
    + ' que desempeñas con el producto para lograr mejores resultados. Si no vendes un producto, entonces'
    + ' marca la casilla \'Otra actividad\' y presiona en "Siguiente".';

    // TODO: El product id debe de ser dinamico.
    this.productId = 1;
  }

  public continue(): void {
    this.store.dispatch(new SetProductAction(this.productId));
    this.router.navigate(['/../address']);
  }

}
