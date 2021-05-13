import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
declare var google;
@Component({
  selector: 'app-show-map',
  templateUrl: './show-map.page.html',
  styleUrls: ['./show-map.page.scss'],
})
export class ShowMapPage implements OnInit {
  lat: any;
  long: any;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  map: any;
  address: string;
  language: string;
  constructor(
    private authService : AuthService,
    public navParams: NavParams,
    private router: Router,
    private toastService: ToastService,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.lat =this.navParams.get('lat'); 
    this.long =this.navParams.get('long');
    this.language = localStorage.getItem("language");
    console.log(this.lat);
    console.log(this.long);
    this.loadMap();
  }
  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      let latLng = new google.maps.LatLng(this.lat, this.long);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.getAddressFromCoords(this.lat, this.long);

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.map.addListener('dragend', () => {

        this.lat = this.map.center.lat();
        this.long = this.map.center.lng();

        this.getAddressFromCoords(this.map.center.lat(), this.map.center.lng())
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords " + lattitude + " " + longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0)
            responseAddress.push(value);

        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value + ", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) => {
        this.address = "Address Not Available!";
      });

  }
}
