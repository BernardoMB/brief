import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
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

  public title: String;
  public subtitle: String;
  public explanation: String;

  public location: { lat: number, lng: number };

  constructor(private router: Router, private store: Store<IApplicationState>) { }

  ngOnInit() {
    this.title = '¿Tu negocio está aquí?';
    this.subtitle = 'Indica la ubicación de tu negocio';
    this.explanation = 'Ayudanos a determinar la ubicación tu negocio para lograr mejores resultados.';

    // Declare Google Map
    let map;

    // Get browser location
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

    // Disable center marker when searching an address
    $('#pac-input').focus(function() {
      const results = document.querySelectorAll('.centerMarker');
      for (const result of <any>results) {
        result.classList.add('focused');
      }
    });

    // Enable center marker when finished searching an address
    $('#pac-input').blur(function() {
      const results = document.querySelectorAll('.centerMarker');
      for (const result of <any>results) {
        result.classList.remove('focused');
      }
    });

    // Deselect the text field when pressed enter key
    document.getElementById('pac-input').addEventListener('keyup', function(e) {
      if (e.which === 13 || e.keyCode === 13) {
        this.blur();
      }
    }, false);
  }

  public ngOnDestroy(): void { }

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
        fullscreenControl: false,
        mapTypeControlOptions: {
          // mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'light_koomkin', 'dark_koomkin']
          mapTypeIds: ['light_koomkin', 'dark_koomkin'],
          position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        tilt: 45,
      };
      const map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
      map.mapTypes.set('light_koomkin', styledLight);
      map.mapTypes.set('dark_koomkin', styledDark);
      map.setMapTypeId('light_koomkin');

      //#region Search Address box
        // Create the map search box and link it to the UI element.
        const input = document.getElementById('pac-input');
        const searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          const places = searchBox.getPlaces();

          if (places.length === 0) {
            return;
          }

          // For each place, get the icon, name and location.
          const bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log('Returned place contains no geometry');
              return;
            }
            map.setZoom(14);
            map.setCenter(place.geometry.location);
          });
        });
      //#endregion

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

  public continue(): void {
    this.router.navigate(['/../coverage']);
  }
}
