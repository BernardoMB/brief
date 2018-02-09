import * as url from 'url';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() imgUrl: string;
  @Input() opacity: boolean;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() { }

  public setStyle(): any {
    const clase = {
      background: `url('${this.imgUrl}') no-repeat center left`,
      backgroundSize: '100%'
    };
    return clase;
  }

  public setOpacity(): any {
    if (this.opacity) {
      const clase = {
        backgroundColor: 'rgba(#32b3aa, 0.5)'
      };
      return clase;
    } else {
      const clase = {
        background: 'linear-gradient(270deg,#33a4bc 20%, #32b3aa 80%)'
      };
      return clase;
    }
  }

  public redirect(event): void {
    $('#external-content').removeClass('show collapse');
    $('#external-content').addClass('collapse');
    if (event === 1) {
      this.router.navigate(['/']);
      return;
    }
    this.router.navigate(['/activity/generic']);
  }

}
