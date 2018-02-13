import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  @ViewChild('registerModal') modal: ModalDirective;

  constructor() {
  }

  ngOnInit() {
  }

  public showModal(): void {
    this.modal.show();
  }

  public hideModal(): void {
    this.modal.hide();
  }

  defaultLogin() {
    alert('default login')
  }

  googleLogin() {
    alert('google login')
  }

  facebookLogin() {
    alert('facebook login')
  }

}
