import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-option-img-card',
  templateUrl: './option-img-card.component.html',
  styleUrls: ['./option-img-card.component.css']
})
export class OptionImgCardComponent implements OnInit {

  @Input() imgUrl: String;
  @Input() cardTitle: String;

  constructor() { }

  ngOnInit() {
  }

}
