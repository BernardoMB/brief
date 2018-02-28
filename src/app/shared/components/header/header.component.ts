import { Component, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'brief-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() title: string;
  @Input() imgUrl: string;
  @Input() opacity: boolean;
  @Output() onRedirect = new EventEmitter<number>();

  constructor() { }

  public setBackgroundImage(): any {
    if (this.imgUrl) {
      return {
        background: `url('${this.imgUrl}') no-repeat center left`,
        backgroundSize: '100%'
      };
    }
  }

  public setOpacity(): any {
    if (this.opacity) {
      return {
        'background-color': 'rgba(50, 179, 170, 0.314)'
      };
    } else {
      return {
        background: 'linear-gradient(270deg,#33a4bc 20%, #32b3aa 80%)'
      };
    }
  }

  public redirect(number): void {
    $('#external-content').removeClass('show collapse');
    $('#external-content').addClass('collapse');
    this.onRedirect.emit(number);
  }

}
