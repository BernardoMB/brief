import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    public title: String;
    public subtitle: String;
    public explanation: String;

    public relatedProducts$: any[] = [
        {
          id: 1,
          name: 'Pisos de madera'
        }, {
          id: 2,
          name: 'Persianas'
        }
      ];

    constructor(private router: Router,
              private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.title = '¿Qué vendes?';
    this.subtitle = null;
    this.explanation = 'Describe brevemente los productos que vendes.'
    + ' Ayudanos a determinar las caracteristicas de tus productos para lograr mejores resultados';
  }

  public onSwitchChange(event$, productId): void {
    console.log(event$, productId);
  }

  /**
   * This function updates the App state and redirects the user to the
   * next view based on the selectedOption propperty.
   * @memberof MakerComponent
   */
  public obtenerEstudioPedero(): void { }

}
