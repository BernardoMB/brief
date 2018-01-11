import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-clients-example',
  templateUrl: './clients-example.component.html',
  styleUrls: ['./clients-example.component.css']
})
export class ClientsExampleComponent implements OnInit {
  public companyName: string;

  constructor() {
    this.companyName = 'Tu empresa';
  }

  ngOnInit() {
    $('body').css('background-color', '#e8f0f9');
  }

  public continue(): void {
    // TODO: implment this function
  }

}
