import { ModalDirective } from 'ng-bootstrap/modal';
import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent implements OnInit {
  @ViewChild('confirmationModal') modal: ModalDirective;

  @Input() name: string;
  @Input() question: string;
  @Input() imgUrl: string;

  @Output() onAnswer = new EventEmitter<boolean>();

  public greeting: string;

  constructor() { }

  ngOnInit() {
    if (this.name) {
      this.greeting = `Hola ${this.name}!`;
    } else {
      this.greeting = 'Hola estimado usuario!';
    }
  }

  public showModal(): void {
    this.modal.show();
  }

  public hideModal(): void {
    this.modal.hide();
  }

  public onResult(answer: boolean): void {
    this.hideModal();
    this.onAnswer.emit(answer);
  }

}
