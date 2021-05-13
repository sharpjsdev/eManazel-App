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
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  type: string;
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
  bills: any = [];
  balance: any;
  graph_points: any = [];
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
  show: string = "";
  hide: string = "";
  total_collection: any;
  total_provider_collection: any;
  total_community_commision: any;
  task_done: any;
  task_not_done: any;
  contract_pending: any;
  contract_accept: any;
  contract_reject: any;
  pieChartData1: {
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
  pieChartData2: {
    chartType: string; dataTable: string[][];
    //opt_firstRowIsData: true,
    options: {
      legend: { position: string; alignment: string; }; chartArea: {
        // leave room for y-axis labels
        width: string; height: string;
      }; is3D: boolean;
    };
  };
  community_staff_type: string;
  visitor_details: any = [];
  pieChartData4: {
    chartType: string; dataTable: string[][];
    //opt_firstRowIsData: true,
    options: {
      legend: { position: string; alignment: string; }; chartArea: {
        // leave room for y-axis labels
        width: string; height: string;
      }; is3D: boolean;
    };
  };
  visitor_in: any;
  visitor_pending: any;
  visitor_out: any;
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
    private _translate: TranslateService,
    private router : Router
  ) { 
    this.getGeolocation();
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
    this.financial_stats = "";
    this.graph_points = "";
    this.balance = "";
    this.bills = "";
    this.language = localStorage.getItem('language');
    this.user_name = localStorage.getItem('user_name');
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.provider_id = localStorage.getItem("provider_id");
    this.service_type_id = localStorage.getItem("service_type_id");
    this.community_staff_type = localStorage.getItem("community_staff_type");
    console.log(this.community_staff_type);
    this.translateConfigService.setLanguage(localStorage.getItem('language'));
    if(this.user_type == '0'){
      this.show = "display:block";
      this.hide = "display:none";
      this.classVariable = "tab_child custome_tab_class";
    }else if(this.user_type == '2'){
      this.show = "display:block";
      this.hide = "display:none";
      this.classVariable = "tab_child custome_tab_class_service";
    }else if(this.user_type == '-1'){
      this.show = "display:block";
      this.hide = "display:none";
      this.classVariable = "tab_child custome_tab_class";
    }else if(this.user_type == '6' && this.community_staff_type != '6'){
      this.classVariable = "tab_child";
    }
    else{
      this.show = "";
      this.hide = "";
      this.classVariable = "tab_child";
    }
    
    if(this.user_type== '4' || this.user_type== '5' || this.user_type== '6' ){
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('staff_type', this.community_staff_type);
    if(this.user_type== '4' || this.user_type== '5'){
    this.authService.common('getBills',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.bills = res['data'];
        this.balance = this.bills.paid_amount+ this.bills.unpaid_amount;  
      }
      })
    }
      this.authService.common('maintainaceStatusGraph',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.graph_points = res['data']; 
          this.staff_accept = this.graph_points.staff_accept;
          this.staff_reject = this.graph_points.staff_reject;
          this.staff_pending = this.graph_points.staff_pending;
          this.useAngularLibrary();
        }
        })
        this.authService.common('financialStatsCountForApp',meeting_post).subscribe((res) => {
          if(res['success']=='1'){
            this.financial_stats = res['data']; 
          }
        })
        if(this.community_staff_type=='1'){
          this.authService.common('getCommunityWiseVisitorGraph',meeting_post).subscribe((res) => {
            if(res['success']=='1'){
              this.visitor_details = res['data'];
              this.visitor_in = this.visitor_details.in_visitor;
              this.visitor_out = this.visitor_details.out_visitor;
              this.visitor_pending = this.visitor_details.pending_visitor;
              this.visitorGraph();
            }
          })
          
        }
      }else{
        
        let meeting_post = new FormData();
        meeting_post.append('user_type', this.user_type);
        meeting_post.append('user_id', this.user_id); 
        meeting_post.append('community_id', this.community_id);
        meeting_post.append('provider_id', this.provider_id);
        meeting_post.append('item_type_id', this.service_type_id);
        this.authService.common('externalServiceStatusGraph',meeting_post).subscribe((res) => {
          if(res['success']=='1'){
            this.graph_points = res['data'];
            if(this.service_type_id == '17'){
              this.contract_accept = this.graph_points.contract_accept;
              this.contract_reject = this.graph_points.contract_reject;
              this.contract_pending = this.graph_points.contract_pending;
              this.contractGraph();
              this.total_collection = this.graph_points.total_payment;
              this.total_provider_collection = this.graph_points.total_provider_payment;
              this.total_community_commision = this.graph_points.total_community_payment; 
            }else{
            this.staff_accept = this.graph_points.staff_accept;
            this.staff_reject = this.graph_points.staff_reject;
            this.staff_pending = this.graph_points.staff_pending;
            this.task_done = this.graph_points.staff_task_done;
            this.task_not_done = this.graph_points.staff_task_not_done;
            this.taskGraph();
            this.useAngularLibrary();
            if(this.user_type == '2' || this.user_type == '-1'){
              this.total_collection = this.graph_points.total_payment;
              this.total_provider_collection = this.graph_points.total_provider_payment;
              this.total_community_commision = this.graph_points.total_community_payment;              
            }
          }
          
        }
          })
          
      }
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
getGeolocation() {
  this.geolocation.getCurrentPosition().then((resp) => {

    this.latitude = resp.coords.latitude;
    this.longitude = resp.coords.longitude;

    this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

  }).catch((error) => {
    console.log('Error getting location' , JSON.stringify(error));
  });
}
sendSOS(){
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
  this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
    .then((result: NativeGeocoderResult[]) => {
      this.address = this.generateAddress(result[0]);
      //alert(this.address);
    })
    .catch((error: any) => {
      //alert('Error getting location' + JSON.stringify(error));
    });
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

visitorGraph() {
    if(this.visitor_in ==0 && this.visitor_out ==0 && this.visitor_pending ==0){
      console.log('dfdf');
      this.pieChartData4 = {
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
      console.log(this.visitor_in,'-',this.visitor_out,'-',this.visitor_pending);
      this.pieChartData4 = {
        chartType: 'PieChart',
        dataTable: [
          ["lables","Status"],
          [this._translate.instant('Common.in_label'), this.visitor_in],
          [this._translate.instant('Common.out_label'), this.visitor_out],
          [this._translate.instant('Common.pending_label'), this.visitor_pending],
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

taskGraph() {
  if(this.task_not_done == 0 && this.task_done == 0){
    this.pieChartData1 = {
      chartType: 'PieChart',
      dataTable: [
        ['lables', this._translate.instant('PopUp.na_data')],
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
  this.pieChartData1 = {
    chartType: 'PieChart',
    dataTable: [
      ["lables","Status"],
      [this._translate.instant('Common.completed_label'), this.task_done],
      [this._translate.instant('Common.pending_label'), this.task_not_done],
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
contractGraph() {
  if(this.contract_accept == 0 && this.contract_reject == 0 && this.contract_pending == 0){
    this.pieChartData2 = {
      chartType: 'PieChart',
      dataTable: [
        ['lables', this._translate.instant('PopUp.na_data')],
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
  this.pieChartData2 = {
    chartType: 'PieChart',
    dataTable: [
      ["lables","Status"],
      [this._translate.instant('Common.accepted_label'), this.contract_accept],
      [this._translate.instant('Common.rejected_label'), this.contract_pending],
      [this._translate.instant('Common.pending_label'), this.contract_reject],
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


redirectToBill(item){
  this.router.navigate(['/bills'],{
    queryParams: {
       value : JSON.stringify(item)
      },
    });
}
}
