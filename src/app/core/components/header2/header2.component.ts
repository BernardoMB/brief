import * as url from 'url';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header2',
  templateUrl: './header2.component.html',
  styleUrls: ['./header2.component.css']
})
export class Header2Component implements OnInit {
  @Input() title: string;
  @Input() backgroundUrl: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.backgroundUrl = '/assets/pisos-de-madera.jpg';
  }

  setStyle() {
    const clase = {
      background: `url('${this.backgroundUrl}') no-repeat center left`
    };
    return clase;
  }

}
