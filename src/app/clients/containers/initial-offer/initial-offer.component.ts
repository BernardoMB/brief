import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-initial-offer',
  templateUrl: './initial-offer.component.html',
  styleUrls: ['./initial-offer.component.css']
})
export class InitialOfferComponent implements OnInit {

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  public goBack(): void {
    this.location.back();
  }

  public continue(): void {
    this.router.navigate(['/offer/clients/adds']);
  }
}
