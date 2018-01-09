import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng-bootstrap/modal';
declare var $: any;

@Component({
  selector: 'app-add-example-modal',
  templateUrl: './add-example-modal.component.html',
  styleUrls: ['./add-example-modal.component.css']
})
export class AddExampleModalComponent implements OnInit {
  @ViewChild('addExampleModal') modal: ModalDirective;

  public productName: string;
  public companyName: string;
  public imgUrl: string;

  constructor() { }

  ngOnInit() {
    this.productName = 'Producto';
    this.companyName = 'Compañia';
    this.imgUrl = './../../../assets/offer/product.jpg';
  }

  public showModal(): void {
    this.modal.show();
  }

  public hideModal(): void {
    this.modal.hide();
  }

  public getStyle(): any {
    const bodyHeight = $('#app-body').height();
    const maximumHeight = bodyHeight - 60;
    const style = {
      margin: '30px',
      paddingTop: '15px',
      paddingLeft: '15px',
      paddingRight: '15px',
      maxHeight: maximumHeight + 'px',
      overflow: 'scroll',
      backgroundColor: '#cfecf7'
    };
    return style;
  }

}
