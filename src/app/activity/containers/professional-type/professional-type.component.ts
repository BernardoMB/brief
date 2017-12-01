import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SetSpecialtyAction } from '../../../store/actions';

@Component({
  selector: 'app-professional-type',
  templateUrl: './professional-type.component.html',
  styleUrls: ['./professional-type.component.css']
})
export class ProfessionalTypeComponent implements OnInit {
  public title: string;
  public subtitle: string;
  public explanation: string;

  public professionId: number;

  constructor(private router: Router,
    private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.title = '¿Qué especialidad tienes?';
    this.subtitle = null;
    this.explanation = 'Ayúdanos a determinar la especialidad'
    + ' que tienes para lograr mejores resultados.';

    // TODO: El product id debe de ser dinamico.
    this.professionId = 1;
  }

  public continue(): void {
    this.store.dispatch(new SetSpecialtyAction(this.professionId));
    this.router.navigate(['/../address']);
  }
}
