import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ModalOptions} from 'ngx-bootstrap';
import * as io from 'socket.io-client';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

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

  emailSubscriber: Subscription;

  passwordVisible = 'password';
  passwordShow = false;

  @ViewChild('registerModal') modal: ModalDirective;
  @Input() ignoreBackdropClick: boolean;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) {
    this.socket = io.connect();

  }

  ngOnInit() {

    this.isRegister = true;

    this.modal.config = <ModalOptions>{
      animated: true,
      backdrop: true,
      ignoreBackdropClick: this.ignoreBackdropClick
    };

    this.myForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'm_last_name': new FormControl(null),
      'email': new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]),
      'cellphone': new FormControl(null, [Validators.required, Validators.minLength(10)]),
      'password': new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      ]),
      'password-repeat': new FormControl(null, Validators.required),
    });

    this.socket.on('userByEmail', user => {
      if (user.length > 0) {
        console.log(user);
        this.myForm.get('email').setErrors({'reservedEmail': true});
      }
    });

    this.emailSubscriber = this.myForm.get('email').valueChanges
      .subscribe(email => this.validateEmail(email));
  }

  validateEmail(email: string) {
    console.log(this.myForm.get('email'));
    if (this.myForm.get('email').valid) {
      this.socket.emit('getUserByEmail', email);
    }
  }

  onSubmit(value) {
    console.log(this.myForm);
  }

  showPassword() {
    if (this.myForm.get('password').value === null || this.myForm.get('password').value.length === 0) {
      return;
    }
    if (this.passwordVisible === 'text') {
      this.passwordVisible = 'password';
      this.passwordShow = true;
    } else {
      this.passwordVisible = 'text';
      this.passwordShow = false;
      /*setTimeout(() => {
        this.passwordVisible = 'password';
        this.passwordShow = true;
      }, 3500);*/
    }

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
