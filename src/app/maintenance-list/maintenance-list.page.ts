import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {AlertService} from '../services/alert.service';
import { ModalController } from '@ionic/angular';
import { InsertMaintainTokenPage } from '../modal/insert-maintain-token/insert-maintain-token.page';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-maintenance-list',
  templateUrl: './maintenance-list.page.html',
  styleUrls: ['./maintenance-list.page.scss'],
})
export class MaintenanceListPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  maintenance: any = [];
  language: any;
  staff_dropdown:any;
  check_back: string;
  address: string;
  latitude: any;
  longitude: any;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  //pieChartData: any;
  graph_points: any = [];
  staff_accept = 0;
  staff_reject = 0;
  staff_pending = 0;
  pieChartData: {
    chartType: string; dataTable: any[][];
    //opt_firstRowIsData: true,
    options: {
      legend: { position: string; alignment: string; }; chartArea: {
        // leave room for y-axis labels
        width: string; height: string;
      }; is3D: boolean;
    };
  };
  community_staff_type: string;
  dataReturned: any;
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private geolocation: Geolocation,
    private alert: AlertService,
    private nativeGeocoder: NativeGeocoder,
    public modalController: ModalController,
    private ionLoader: LoaderService,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService,
    private _translate: TranslateService
  ) {
    this.getGeolocation();
   }

  ngOnInit() {
  }
  async insertToken(request_id , type) {
    const modal = await this.modalController.create({
      component: InsertMaintainTokenPage,
      cssClass: 'my-custom-modal forgot-modal',
      backdropDismiss:false,
      componentProps: {
        'req_id': request_id,
        'req_type': type
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      console.log(dataReturned.data);
      if(dataReturned.data == 1){
        this.ionViewWillEnter();
      }
    });
    return await modal.present();
  }
  useAngularLibrary() {
    this.pieChartData = {
      chartType: 'PieChart',
      dataTable: [
        ['Task', 'Hours per Day'],
        ['Accepted', this.staff_accept],
        ['Rejected', this.staff_reject],
        ['Pending', this.staff_pending],
      ],
      //opt_firstRowIsData: true,
      options: {
        legend: { position: 'bottom', alignment: 'center' },
        chartArea: {
          // leave room for y-axis labels
          width: '100%',
          height:"80%",
        },
        is3D: true,
        
      },
    };
  
  }
  ionViewWillEnter(): void {
    
    this.check_back = "no";
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.community_staff_type = localStorage.getItem("community_staff_type");
    this.language = localStorage.getItem("language");
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('staff_type', this.community_staff_type);
    this.authService.common('getMaintenances',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.maintenance = res['data'];   
        //console.log(this.maintenance);  
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
    this.authService.common('maintainaceStatusGraph',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.graph_points = res['data']; 
        this.staff_accept = this.graph_points.staff_accept;
        this.staff_reject = this.graph_points.staff_reject;
        this.staff_pending = this.graph_points.staff_pending;
         this.useAngularLibrary();
      }
      })
      this.checkNotification();
  }
  checkNotification(){
    let meeting_post = new FormData();
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    this.authService.common('getNotificationForApp',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.notification_count = res['data'].notification_count;
      }else{
        this.notification_count="";
      }
      })
  }
  changedLanguage(lang){
    localStorage.setItem('language',lang);
    this.language = localStorage.getItem('language');
    this.translateConfigService.changeLanguage(this.language);
    this.event.publish('directiochanged', 'true');
    
  }
  async settingsPopover(ev: any) {
    const siteInfo = { id: 1, name: 'edupala' };
    const popover = await this.popoverController.create({
      component: SettingPage,
      event: ev,
      cssClass: 'popover_setting',
      componentProps: {
        site: siteInfo
      },
      translucent: false
    });
  
    popover.onDidDismiss().then((result) => {
      console.log(result.data);
    });
  
    return await popover.present();
    /** Sync event from popover component */
  
  }
  ionViewWillLeave (){
    this.staff_dropdown="";
    this.check_back = "yes";
  }
  searchByDropdown(ev){
    this.graph_points = [];
    if(this.check_back!='yes'){
    var status = ev
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('staff_type', this.community_staff_type);
    meeting_post.append('dropdown', status);
    this.authService.common('getMaintenances',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.maintenance = res['data'];   
          
      }else{
        this.maintenance = [];
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
      this.authService.common('maintainaceStatusGraph',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.graph_points = res['data']; 
          this.staff_accept = this.graph_points.staff_accept;
          this.staff_reject = this.graph_points.staff_reject;
          this.staff_pending = this.graph_points.staff_pending;
          console.log(this.staff_accept,this.staff_reject,this.staff_pending);
           this.useAngularLibrary();
        }
      })      
   }
  }
  sendSOS(request_id){
    this.language = localStorage.getItem('language');
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
        meeting_post.append('request_id', request_id);
        this.authService.common('addMaintenanceAlert',meeting_post).subscribe((res) => {
          if(res['success']=='1'){
            this.toastService.presentToast(res['message']);
          }else{
            this.toastService.presentToast(res['message']);
          }
          })
      }
    })
    
  }
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
  
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
  
      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);
  
    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }
  getGeoencoder(latitude, longitude) {
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
