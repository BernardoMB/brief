import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-real-img-card',
  templateUrl: './real-img-card.component.html',
  styleUrls: ['./real-img-card.component.css']
})
export class RealImgCardComponent implements OnInit {

  @Input() imgUrl: String;
  @Input() cardTitle: String;

  constructor() { }

  ngOnInit() {
  }

  public setStyle(): any {
    const clase = {
      height: '170px',
      width: '100%',
      background: `url('${this.imgUrl}') no-repeat center left`,
      backgroundSize: '100%'
    };
    return clase;
  }
}
