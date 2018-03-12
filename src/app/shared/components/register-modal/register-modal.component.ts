import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ModalOptions } from 'ngx-bootstrap';
import * as io from 'socket.io-client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'brief-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  public isRegister: boolean;
  private socket: SocketIOClient.Socket;
  private isValidEmail = true;
  myForm: FormGroup;

  @ViewChild('registerModal') modal: ModalDirective;
  @Input() ignoreBackdropClick: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {
    this.socket = io.connect();
    this.myForm = fb.group({
      'email': ['', Validators.email]
    });
  }

  ngOnInit() {
    this.socket.on('userByEmail', user => {
      if (user) {
        this.isValidEmail = false;
      }
    });
    this.isRegister = true;
    this.modal.config = <ModalOptions>{
      animated: true,
      backdrop: true,
      ignoreBackdropClick: this.ignoreBackdropClick
    };
  }

  onSubmit(value) {
    console.log(value);
  }

  public showModal(): void {
    this.modal.show();
  }

  public hideModal(): void {
    this.modal.hide();
  }

  switchRegister() {
    this.isRegister = !this.isRegister;
  }

  googleLogin() {
    this.authService.signInWithGoogle()
      .then((res) => {
        console.log(res);
        this.router.navigate(['/']);
      })
      .catch((err) => console.log(err));
  }

  facebookLogin() {
    this.authService.signInWithFacebook()
      .then((res) => {
        console.log(res);
        this.router.navigate(['/']);
      })
      .catch((err) => console.log(err));
  }

  twitterLogin() {
    this.authService.signInWithTwitter()
      .then((res) => {
        console.log(res);
        this.router.navigate(['/']);
      })
      .catch((err) => console.log(err));
  }

}
