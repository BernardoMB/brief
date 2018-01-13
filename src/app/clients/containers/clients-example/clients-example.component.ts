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
    $('#myCarousel').carousel({
      interval: false
    });
    $('#uno').on('click', function() {
      $('#uno').css({'background-color': '#32b3aa'});
      $('#dos').css({'background-color': '#f4f8fc'});
      /* $('#uno').css({'background-color': 'red'});
      $('#dos').css({'background-color': 'blue'}); */
    });
    $('#dos').on('click', function() {
      $('#dos').css({'background-color': '#32b3aa'});
      $('#uno').css({'background-color': '#f4f8fc'});
      /* $('#dos').css({'background-color': 'red'});
      $('#uno').css({'background-color': 'blue'}); */
    });
  }

  public continue(): void {
    // TODO: implment this function
  }

}
