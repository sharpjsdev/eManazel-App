import { Component, OnInit } from '@angular/core';
import {AlertService} from '../services/alert.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
@Component({
  selector: 'app-menu-header',
  templateUrl: './menu-header.page.html',
  styleUrls: ['./menu-header.page.scss'],
})
export class MenuHeaderPage implements OnInit {
  language: string;
  user_name: string;
  latitude: any;
  longitude: any;
  user_type: string;
  community_id: string;
  user_id: string;
  address: string;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  hide: string;
  show: string;
  classVariable = "tab_child";
  service_type_id: string;
  provider_id: string;
  community_staff_type: string;
  constructor(
    private alert: AlertService,
    private geolocation: Geolocation,
    private authService : AuthService,
    private toastService : ToastService,
    private nativeGeocoder: NativeGeocoder,
    private _translate: TranslateService
  ) { 
    this.getGeolocation();
  }

  ngOnInit() {
    this.user_type = localStorage.getItem("user_type");
    this.service_type_id = localStorage.getItem("service_type_id");
    this.provider_id = localStorage.getItem("provider_id");
    this.community_staff_type = localStorage.getItem("community_staff_type");
    if(this.user_type == '0' || this.user_type == '-1'){
      this.show = "display:block";
      this.hide = "display:none";
      this.classVariable = "tab_child custome_tab_class";
    }else if(this.user_type == '2'){
      this.show = "display:block";
      this.hide = "display:none";
      this.classVariable = "tab_child custome_tab_class_service";
    }else if(this.user_type == '6' && this.community_staff_type!='6'){
      this.classVariable = "tab_child";
    }else{
      this.show = "";
      this.hide = "";
      this.classVariable = "tab_child";
    }
  }
  
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
  
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
  
      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
  
    }).catch((error) => {
      //alert('Error getting location' + JSON.stringify(error));
    });
  }
  sendSOS(){
    
    this.language = localStorage.getItem('language');
    this.user_name = localStorage.getItem('user_name');
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.alert.presentConfirm('SOS',this._translate.instant('PopUp.alert_msg'),this._translate.instant('Common.no_label'),this._translate.instant('Common.yes_label')).then(res => {
      if(res == 'ok'){
        let meeting_post = new FormData();
        meeting_post.append('user_type', this.user_type);
        meeting_post.append('user_id', this.user_id); 
        meeting_post.append('community_id', this.community_id);
        meeting_post.append('latitude', this.latitude);
        meeting_post.append('longitude', this.longitude);
        meeting_post.append('location', this.address);
        this.authService.common('addPanicAlert',meeting_post).subscribe((res) => {
          if(res['success']=='1'){
            this.toastService.presentToast(res['message']);
          }else{
            this.toastService.presentToast(res['message']);
          }
          })
      }
    })
    
  }
  getGeoencoder(latitude, longitude) {
    //alert(latitude+'-'+longitude);
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {
        this.address = this.generateAddress(result[0]);
      })
      .catch((error: any) => {
       //alert('Error getting location' + JSON.stringify(error));
      });
  }
  
  //Return Comma saperated address
  generateAddress(addressObj) {
    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }
    return address.slice(0, -2);
  }
}
