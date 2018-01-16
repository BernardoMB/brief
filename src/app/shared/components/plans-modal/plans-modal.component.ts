import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-bootstrap/modal';

@Component({
  selector: 'app-plans-modal',
  templateUrl: './plans-modal.component.html',
  styleUrls: ['./plans-modal.component.css']
})
export class PlansModalComponent implements OnInit {
  @ViewChild('plansModal') modal: ModalDirective;

  // TODO: Convert to input
  public isPpl: boolean;
  // Jade
  public pplClientsNumber: number;
  public pplJadeCost: number;
  public pplImperialJadeCost: number;
  public pplJadeClients: number;
  public pplImperialJadeClients: number;
  // Normal
  public ClientsNumber: number;
  public jadeCost: number;
  public imperialJadeCost: number;

  constructor() { }

  ngOnInit() {
    this.isPpl = true;
    this.pplClientsNumber = 55;
    this.pplJadeCost = 15;
    this.pplImperialJadeCost = 10;
    this.pplJadeClients = 20;
    this.pplImperialJadeClients = 35;

    this.jadeCost = 2900;
    this.imperialJadeCost = 5800;
  }

  public showModal(): void {
    this.modal.show();
  }

  public closeModal(): void {
    this.modal.hide();
  }

}
