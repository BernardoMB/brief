import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ModalOptions} from 'ngx-bootstrap';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss']
})
export class RegisterModalComponent implements OnInit {

  public isRegister: boolean;

  @ViewChild('registerModal') modal: ModalDirective;
  @Input() ignoreBackdropClick: boolean;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.isRegister = true;
    this.modal.config = <ModalOptions>{
      animated: true,
      backdrop: true,
      ignoreBackdropClick: this.ignoreBackdropClick
    };
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
