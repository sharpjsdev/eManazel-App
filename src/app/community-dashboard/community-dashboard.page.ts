import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
import {AlertService} from '../services/alert.service'
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
@Component({
  selector: 'app-community-dashboard',
  templateUrl: './community-dashboard.page.html',
  styleUrls: ['./community-dashboard.page.scss'],
})
export class CommunityDashboardPage implements OnInit {
  type: string;
  language: string;
  user_name: string;
  latitude: any;
  longitude: any;
  user_type: string;
  community_id: string;
  user_id: string;
  graph_points: any = [];
  external_graph_points : any = [];
  staff_accept = 0;
  staff_reject = 0;
  staff_pending = 0;
  classVariable = "tab_child";
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
  notification_count: any;
  financial_stats: any = {};
  subscription: any;
  external_pending = 0;
  external_accept= 0;
  external_reject = 0;
  pieChartData2: {
    chartType: string; dataTable: any[][];
    //opt_firstRowIsData: true,
    options: {
      legend: { position: string; alignment: string; }; chartArea: {
        // leave room for y-axis labels
        width: string; height: string;
      }; is3D: boolean;
    };
  };
  provider_id: string;
  service_type_id: string;

  community_staff_type: string;
  dataTable = [];
  collection: any = [];
  constructor(
    private translateConfigService: TranslateConfigService,
    private event: EventService,
    private alert: AlertService,
    private geolocation: Geolocation,
    private authService : AuthService,
    private toastService : ToastService,
    private nativeGeocoder: NativeGeocoder,
    private ionLoader: LoaderService,
    private platform : Platform,
    private popoverController: PopoverController,
    private router : Router,
    private _translate: TranslateService,
  ) { 
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
  ngOnInit() {
    this.type = 'default_theme';  
    
  }
  segmentChanged(ev: any) {  
    console.log('Segment changed', ev);
  } 
changedLanguage(lang){
  localStorage.setItem('language',lang);
  this.language = localStorage.getItem('language');
  this.translateConfigService.changeLanguage(this.language);
  this.event.publish('user:login', {
  });
  
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
ionViewWillEnter() {	
  this.graph_points = "";
  this.language = localStorage.getItem('language');
    this.user_name = localStorage.getItem('user_name');
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.provider_id = localStorage.getItem("provider_id");
    this.service_type_id = localStorage.getItem("service_type_id");
    this.community_staff_type = localStorage.getItem("community_staff_type");
    this.translateConfigService.setLanguage(localStorage.getItem('language'));
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('staff_type', this.community_staff_type);
    this.authService.common('maintainaceStatusGraph',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.graph_points = res['data']; 
        this.staff_accept = this.graph_points.staff_accept;
        this.staff_reject = this.graph_points.staff_reject;
        this.staff_pending = this.graph_points.staff_pending;
        this.useAngularLibrary();
      }
    })
      this.authService.common('getCommunityWiseExternalServiceStatusGraph',meeting_post).subscribe((res1) => {
        if(res1['success']=='1'){
          this.external_graph_points = res1['data']; 
          this.external_accept = this.external_graph_points.accept;
          this.external_reject = this.external_graph_points.reject;
          this.external_pending = this.external_graph_points.pending;
          this.externalGraph();
        }
      })
      this.authService.common('getCommunityWiseCollection',meeting_post).subscribe((res1) => {
        if(res1['success']=='1'){
          this.collection = res1['data'];
          console.log(this.collection);
        }
      })
      this.checkNotification();
}
useAngularLibrary() {
 
  if(this.staff_accept ==0 && this.staff_pending ==0 && this.staff_reject ==0){
    this.pieChartData = {
      chartType: 'PieChart',
      dataTable: [
        ["lables",this._translate.instant('PopUp.na_data')]
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
    
  }else{
    this.pieChartData = {
      chartType: 'PieChart',
      dataTable: [
        ["lables","Status"],
        [this._translate.instant('Common.accepted_label'), this.staff_accept],
        [this._translate.instant('Common.rejected_label'), this.staff_reject],
        [this._translate.instant('Common.pending_label'), this.staff_pending],
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
  

}

externalGraph() {
  if(this.external_accept ==0 && this.external_pending ==0 && this.external_reject ==0){
    this.pieChartData2 = {
      chartType: 'PieChart',
      dataTable: [
        ["lables",this._translate.instant('PopUp.na_data')]
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
    
  }else{
    console.log("helo1");
    this.pieChartData2 = {
      chartType: 'PieChart',
      dataTable: [
        ["lables","Status"],
        [this._translate.instant('Common.accepted_label'), this.external_accept],
        [this._translate.instant('Common.rejected_label'), this.external_reject],
        [this._translate.instant('Common.pending_label'), this.external_pending],
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
  

}
}
