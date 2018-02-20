import { SetLocationAction, SetHeaderTitleAction, TurnOffIsLoadingAction, TurnOnIsLoadingAction } from '../../../store/actions';
import { ILocation } from '../../../../shared/models/ILocation';
import { Store } from '@ngrx/store';
import { IApplicationState } from '../../../store/models/app-state';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Subscription } from 'rxjs/Subscription';
import { ILead } from '../../../../shared/models/ILead';
declare var google: any;
declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @ViewChild('confirmationModal') confirmationModal: ConfirmationModalComponent;

  // Route params
  public source: number;
  public userData: string;
  public campaignId: number;
  public paramsSubscription: Subscription;

  // Modal variables
  public name: string;
  public question: string;
  public imgUrlModal: string;

  // View variables.
  public title: String;
  public subtitle: String;
  public explanation: String;

  // To know confirmation modal need to be showed when the components get initialized.
  public confirmed: Subscription;

  // User location.
  public location: { lat: number, lng: number };

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private store: Store<IApplicationState>) {
    const headerTitle = '¿Tu negocio está aquí?';
    this.store.dispatch(new SetHeaderTitleAction(headerTitle));
  }

  ngOnInit() {
    this.store.dispatch(new TurnOffIsLoadingAction());
    this.source = this.activatedRoute.snapshot.params['source'];
    this.userData = this.activatedRoute.snapshot.params['userdata'];
    if (this.userData) {
      const userDataObject: ILead = JSON.parse(this.userData);
      this.name = userDataObject.fullName;
    }
    this.campaignId = this.activatedRoute.snapshot.params['campaignid'];
    this.paramsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      this.source = params['source'];
      this.userData = params['userdata'];
      if (this.userData) {
        this.name = JSON.parse(this.userData).fullName;
      }
      this.campaignId = params['campaignid'];
    });

    this.question = '¿Ofreces el servicio x?';
    this.imgUrlModal = './../../../assets/svg/generic/service-mau.svg';

    this.title = '¿Tu negocio está aquí?';
    this.subtitle = 'Indica la ubicación de tu negocio';
    this.explanation = 'Ayudanos a determinar la ubicación tu negocio para lograr mejores resultados.';

    // Get confirmed variable from the store to know if I should show the confirmation modal.
    this.confirmed = this.store.select(state => state.storeData.confirmed)
    .subscribe(value => {
      if (!value) {
        setTimeout(() => {
          this.confirmationModal.showModal();
        }, 0);
      }
    });

    // Declare Google Map
    let map;

    // Get browser location
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(position => {
      // TODO: hacer que no haya error sirviendo lo pagina desde el protocolo https.
      // alert('todo chido');
      const coords = position.coords;
      this.location = {
        lat: coords.latitude,
        lng: coords.longitude
      };
      map = this.initMap();
    }, error => {
      // TODO: hacer que no haya error.
      // alert(error.code);
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

    const _originalSize = $(window).width() + $(window).height();
    $(window).resize(function(){
      if ($(window).width() + $(window).height() !== _originalSize) {
        console.log('keyboard show up');
        // alert('keyboard show up');
        $('.copyright_link').css('position', 'relative');
      } else {
        console.log('keyboard closed');
        // alert('keyboard closed');
        $('#pac-input').blur();
        $('.copyright_link').css('position', 'fixed');
      }
    });
  }

  public ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }

  //#region Confirmation Modal event binding
    /**
     * This function gets executed when the user confirmed.
     * @param {any} event
     * @memberof MakerComponent
     */
    public onUserConfirmed(event): void {
      if (event) {
        // Execute some code.
      } else {
        // Redirect user to generic campaign
        this.router.navigate(['/activity/generic']);
      }
    }
  //#endregion

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
        zoomControl: false,
        mapTypeControl: false,
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
        const mamon = document.getElementById('mamon');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(mamon);

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
      // do something when the user clicks the center marker.
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

  public getMapStyle(): any {
    const bodyHeight = $('#app-body').height();
    const headerHeight = $('#non-collapse').height();
    const actualHeight = bodyHeight - headerHeight;
    return {
      height: actualHeight + 'px'
    };
  }

  public continue(): void {
    this.store.dispatch(new TurnOnIsLoadingAction());
    this.store.dispatch(new SetLocationAction(this.location));
    setTimeout(() => {
      this.router.navigate(['/../coverage']);
    }, 100);
  }
}
