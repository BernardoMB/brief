import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'brief-instruction-card',
  templateUrl: './instruction-card.component.html',
  styleUrls: ['./instruction-card.component.css']
})
export class InstructionCardComponent implements OnInit {

  @Input() title: String;
  @Input() subtitle: String;
  @Input() explanation: String;

  constructor() { }

  ngOnInit() {
  }

}
