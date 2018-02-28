import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'brief-option-img-card',
  templateUrl: './option-img-card.component.html',
  styleUrls: ['./option-img-card.component.scss']
})
export class OptionImgCardComponent implements OnInit {

  @Input() imgUrl: String;
  @Input() cardTitle: String;

  constructor() { }

  ngOnInit() {
  }

  public getStyle(): any {
    return {
      width: '100%',
      height: '100%',
      background: `url('${this.imgUrl}') no-repeat center left`,
      backgroundSize: '100% 100%'
    };
  }

}
