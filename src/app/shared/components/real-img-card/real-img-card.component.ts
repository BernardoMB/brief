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
}
