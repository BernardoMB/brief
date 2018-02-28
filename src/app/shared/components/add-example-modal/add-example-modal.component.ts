import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-bootstrap/modal';
declare var $: any;

@Component({
  selector: 'brief-add-example-modal',
  templateUrl: './add-example-modal.component.html',
  styleUrls: ['./add-example-modal.component.scss']
})
export class AddExampleModalComponent implements OnInit {
  @ViewChild('addExampleModal') modal: ModalDirective;

  public productName: string;
  public companyName: string;
  public imgUrl: string;

  constructor() { }

  ngOnInit() {
    this.productName = 'Producto';
    this.companyName = 'Tu empresa';
    this.imgUrl = './../../../assets/images/offer/product.jpg';
  }

  public showModal(): void {
    this.modal.show();
  }

  public closeModal(): void {
    this.modal.hide();
  }

  public getStyle(): any {
    const bodyHeight = $('#app-body').height();
    const maximumHeight = bodyHeight - 60;
    const style = {
      maxHeight: maximumHeight + 'px'
    };
    return style;
  }

}
