import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-offer',
  templateUrl: './initial-offer.component.html',
  styleUrls: ['./initial-offer.component.css']
})
export class InitialOfferComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public continue(): void {
    this.router.navigate(['/offer/clients/adds']);
  }
}
