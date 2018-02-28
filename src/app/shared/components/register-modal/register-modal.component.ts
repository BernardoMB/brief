import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'brief-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  public isRegister: boolean;

  @ViewChild('registerModal') modal: ModalDirective;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isRegister = true;
  }

  public showModal(): void {
    this.modal.show();
  }

  public hideModal(): void {
    this.modal.hide();
  }

  defaultLogin() {
    if (!this.isRegister) {
      alert('iniciar sesion')
    } else {
      this.isRegister = !this.isRegister;
    }

  }

  defaultRegister() {
    if (this.isRegister) {
      alert('registrar')
    } else {
      this.isRegister = !this.isRegister;
    }
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
