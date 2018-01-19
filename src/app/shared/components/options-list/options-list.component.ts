import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-options-list',
  templateUrl: './options-list.component.html',
  styleUrls: ['./options-list.component.scss']
})
export class OptionsListComponent implements OnInit {
  @Input() options: any;

  @Output() onOptionSelected = new EventEmitter<number>();

  public selectedOption: number;

  constructor() { }

  ngOnInit() {
  }

  public getBoxShadowForCard(roleId: number): String {
    if (this.selectedOption === roleId) {
      return '0px 0px 0px 10px #32b3aa inset';
    }
    return null;
  }

  public assignRole(optionId: number): void {
    if (this.selectedOption === optionId) {
      this.selectedOption = undefined;
      this.onOptionSelected.emit(this.selectedOption);
    } else {
      this.selectedOption = optionId;
      this.onOptionSelected.emit(this.selectedOption);
    }
  }

}
