import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { PlansModalComponent } from '../../../shared/components/plans-modal/plans-modal.component';
declare var $: any;

@Component({
  selector: 'app-clients-example',
  templateUrl: './clients-example.component.html',
  styleUrls: ['./clients-example.component.css']
})
export class ClientsExampleComponent implements OnInit {
  @ViewChild('plansModal') plansModal: PlansModalComponent;

  public companyName: string;

  constructor(private router: Router) {
    this.companyName = 'Tu empresa';
  }

  ngOnInit() {
    $('body').css('background-color', '#e8f0f9');
    $('#myCarousel').carousel({
      interval: false
    });
    $('#uno').on('click', function() {
      $('#uno').css({'background-color': '#32b3aa'});
      $('#dos').css({'background-color': '#f4f8fc'});
    });
    $('#dos').on('click', function() {
      $('#dos').css({'background-color': '#32b3aa'});
      $('#uno').css({'background-color': '#f4f8fc'});
    });
  }

  /**
   * Esta función abre el modal en donde se especifican los planes disponibles para el usuario.
   * @memberof ClientsExampleComponent
   */
  public showPlans(): void {
    this.plansModal.showModal();
  }

  public continue(election): void {
    // TODO: implement this funciton correctly.
    this.router.navigate(['/offer/clients/payment']);
  }

}
