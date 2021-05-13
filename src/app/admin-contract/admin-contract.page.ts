import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-admin-contract',
  templateUrl: './admin-contract.page.html',
  styleUrls: ['./admin-contract.page.scss'],
})
export class AdminContractPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  contract: any = [];
  language: any;
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
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void {
    
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
    this.authService.common('getContracts',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.contract = res['data'];   
        console.log(this.contract);  
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
    this.authService.common('getContractsGraph',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.graph_points = res['data']; 
        this.staff_accept = this.graph_points.contract_accept;
        this.staff_reject = this.graph_points.contract_reject;
        this.staff_pending = this.graph_points.contract_pending;
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
  useAngularLibrary() {
    this.pieChartData = {
      chartType: 'PieChart',
      dataTable: [
        ['Task', 'Status'],
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
}
