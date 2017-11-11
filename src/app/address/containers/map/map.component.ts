import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
declare var google: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {

  private isLoadingSubscription: Subscription;
  public title: String;
  public subtitle: String;
  public explanation: String;

  public location: { lat: number, lng: number };

  constructor(private router: Router,
              private slimLoadingBarService: SlimLoadingBarService,
              private store: Store<IApplicationState>) {
  }

  ngOnInit() {
    this.isLoadingSubscription = this.store.select(state => state.uiState.isLoading)
    .subscribe(isLoading => isLoading ? this.startLoading() : this.completeLoading());

    this.title = '¿Tu negocio está aquí?';
    this.subtitle = 'Indica la ubicación de tu negocio';
    this.explanation = 'Ayudanos a determinar la ubicación tu negocio para lograr mejores resultados.';

    let map;
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(position => {
      const coords = position.coords;
      this.location = {
        lat: coords.latitude,
        lng: coords.longitude
      };
      map = this.initMap();
    }, error => {
      console.warn(`ERROR(${error.code}): ${error.message}`);
      map = this.initMap();
    }, options);
  }

  public ngOnDestroy(): void {
    this.isLoadingSubscription.unsubscribe();
  }

  //#region Map functions
    public initMap(): any {
      const lightStyles = [{
        stylers: [{
          hue: '#607D8B'
        }, {
          saturation: -20
        }]
      }, {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{
          lightness: 80
        }, {
          visibility: 'simplified'
        }]
      }, {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{
          visibility: 'simplified'
        }]
      }];
      const darkStyles = [{
        featureType: 'all',
        elementType: 'all',
        stylers: [{
          invert_lightness: true
        }, {
          saturation: 10
        }, {
          lightness: 30
        }, {
          gamma: 0.5
        }, {
          hue: '#435158'
        }]
      }];
      const styledLight = new google.maps.StyledMapType(lightStyles, {
        name: 'Koomkin Light'
      });
      const styledDark = new google.maps.StyledMapType(darkStyles, {
        name: 'Koomkin Dark'
      });
      let center;
      let zoom;
      if (this.location) {
        center = new google.maps.LatLng(this.location.lat, this.location.lng);
        zoom = 15;
      } else {
        center = new google.maps.LatLng(22.836945241569868, -101.70043984375);
        zoom = 5;
      }
      const mapOptions = {
        center,
        zoom,
        streetViewControl: false,
        mapTypeControlOptions: {
          // mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'light_koomkin', 'dark_koomkin']
          mapTypeIds: ['light_koomkin', 'dark_koomkin']
        },
        tilt: 45,
      };
      const map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
      map.mapTypes.set('light_koomkin', styledLight);
      map.mapTypes.set('dark_koomkin', styledDark);
      map.setMapTypeId('light_koomkin');

      // Get center after click event
      google.maps.event.addListener(map, 'click', function(event) {
        console.log('Center after click event', map.getCenter().toJSON());
      });

      // Get location on double click event
      google.maps.event.addListener(map, 'dblclick', function(event) {
        console.log('Center after double click event', event.latLng.toJSON());
        /* const marker = new google.maps.Marker({
          position: event.latLng,
          map: map
        }); */
      });

      //#region Get center after dragg event
        google.maps.event.addListener(map, 'idle', function() {
          if (!this.get('dragging') && this.get('oldCenter') && this.get('oldCenter') !== this.getCenter()) {
            console.log('Center after dragg event', map.getCenter().toJSON());
            /* const marker = new google.maps.Marker({
              position: map.getCenter(),
              map: map
            }); */
          }
          if (!this.get('dragging')) {
          this.set('oldCenter', this.getCenter());
          }
        });

        google.maps.event.addListener(map, 'dragstart', function() {
          this.set('dragging', true);
        });

        google.maps.event.addListener(map, 'dragend', function() {
          this.set('dragging', false);
          google.maps.event.trigger(this, 'idle', {});
        });
      //#endregion

      // Limit zoom level
      google.maps.event.addListener(map, 'zoom_changed', function () {
        if (map.getZoom() < 2) {
          map.setZoom(2);
        }
      });

      // centerMarker class is specified on index.html
      $('<div/>').addClass('centerMarker').appendTo(map.getDiv())
      // do something onclick
      .click(function() {
        const that = $(this);
        if (!that.data('win')) {
          that.data('win', new google.maps.InfoWindow({
            content: 'Tu negocio',
            pixelOffset: new google.maps.Size(0, -55)
          }));
          that.data('win').bindTo('position', map, 'center');
        }
        that.data('win').open(map);
      });

      return map;
    }
  //#endregion

  //#region Loading bar
      public startLoading(): void {
          this.slimLoadingBarService.start(() => {
              // Callback cuando se termina la carga
          });
      }
      public stopLoading(): void {
          this.slimLoadingBarService.stop();
      }
      public completeLoading(): void {
          this.slimLoadingBarService.complete();
      }
  //#endregion

  public continue(): void {
    this.router.navigate(['/../coverage']);
  }
}
