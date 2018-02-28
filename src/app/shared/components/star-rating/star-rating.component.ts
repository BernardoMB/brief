import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'brief-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss']
})
export class StarRatingComponent implements OnInit {
  public rating: number;
  @Output() onStarClicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public onStarClick($event): void {
    this.rating = $event.rating;
    this.onStarClicked.emit(this.rating);
  }

}
