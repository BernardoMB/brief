import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'brief-real-img-card',
  templateUrl: './real-img-card.component.html',
  styleUrls: ['./real-img-card.component.scss']
})
export class RealImgCardComponent implements OnInit {

  @Input() imgUrl: String;
  @Input() cardTitle: String;

  constructor() { }

  ngOnInit() {
  }

  public setStyle(): any {
    const cssClass = {
      backgroundImage: `url('${this.imgUrl}')`,
      backgroundSize: '100% 100%'
    };
    return cssClass;
  }
}
