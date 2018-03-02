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

  public showExternalContent: boolean;

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
        background: '-webkit-linear-gradient(left, #33a4bc, #32b3aa)'
      };
    }
  }

  public toggleExternalContent(): void {
    if (this.showExternalContent) {
      this.showExternalContent = false;
    } else {
      this.showExternalContent = true;
    }
    
  }

  public redirect(number): void {
    $('#external-content').removeClass('show collapse');
    $('#external-content').addClass('collapse');
    this.onRedirect.emit(number);
  }

}
