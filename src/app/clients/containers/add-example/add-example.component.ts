import { Component, OnInit, ViewChild } from '@angular/core';
import { AddExampleModalComponent } from '../../../shared/components/add-example-modal/add-example-modal.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-example',
  templateUrl: './add-example.component.html',
  styleUrls: ['./add-example.component.css']
})
export class AddExampleComponent implements OnInit {
  @ViewChild('addExampleModal') addExampleModal: AddExampleModalComponent;

  constructor(private router: Router, private location: Location) { }

  ngOnInit() {
  }

  public openModal(): void {
    this.addExampleModal.showModal();
  }

  public goBack(): void {
    this.location.back();
  }

  public continue(): void {
    this.router.navigate(['/offer/clients/clients']);
  }
}
