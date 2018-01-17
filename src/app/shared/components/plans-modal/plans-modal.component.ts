import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-bootstrap/modal';

@Component({
  selector: 'app-plans-modal',
  templateUrl: './plans-modal.component.html',
  styleUrls: ['./plans-modal.component.css']
})
export class PlansModalComponent implements OnInit {
  @ViewChild('plansModal') modal: ModalDirective;

  @Input() isPpl: boolean;
  // Jade
  @Input() pplClientsNumber: number;
  @Input() pplJadeCost: number;
  @Input() pplImperialJadeCost: number;
  @Input() pplJadeClients: number;
  @Input() pplImperialJadeClients: number;
  // Normal
  @Input() ClientsNumber: number;
  @Input() jadeCost: number;
  @Input() imperialJadeCost: number;

  @Output() onElection = new EventEmitter<number>();

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

  public elect(election): void {
    console.log(election);
    this.onElection.emit(election);
    this.closeModal();
  }

}
