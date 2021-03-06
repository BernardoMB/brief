import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'brief-next-button',
  templateUrl: './next-button.component.html',
  styleUrls: ['./next-button.component.scss']
})
export class NextButtonComponent implements OnInit {
  @Input() text: string;
  @Output() onClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  public continue(): void {
    setTimeout(() => {
      this.onClicked.emit(true);
    }, 0);
  }

}
