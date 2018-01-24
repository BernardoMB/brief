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
  @Input() backgroundUrl: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.backgroundUrl = '/assets/pisos-de-madera-2.jpg';
  }

  public setStyle(): any {
    const clase = {
      background: `url('${this.backgroundUrl}') no-repeat center left`,
      backgroundSize: '100%'
    };
    return clase;
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
