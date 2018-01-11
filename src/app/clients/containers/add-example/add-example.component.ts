import { Component, OnInit, ViewChild } from '@angular/core';
import { AddExampleModalComponent } from '../../../shared/components/add-example-modal/add-example-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-example',
  templateUrl: './add-example.component.html',
  styleUrls: ['./add-example.component.css']
})
export class AddExampleComponent implements OnInit {
  @ViewChild('addExampleModal') addExampleModal: AddExampleModalComponent;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public openModal(): void {
    this.addExampleModal.showModal();
  }

  public continue(): void {
    this.router.navigate(['/offer/clients/clients']);
  }
}
