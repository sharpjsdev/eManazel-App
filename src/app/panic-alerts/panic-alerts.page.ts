import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import {AlertService} from '../services/alert.service';
import { ModalController } from '@ionic/angular';
import { ShowMapPage } from '../modal/show-map/show-map.page';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-panic-alerts',
  templateUrl: './panic-alerts.page.html',
  styleUrls: ['./panic-alerts.page.scss'],
})
export class PanicAlertsPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  panic_alert: any = [];
  language: any;
  page_number = 1;
  start : any = 10;
  start1: any;
  notification_count: any;
  community_name: string;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private alert: AlertService,
    public modalController: ModalController,
    private ionLoader: LoaderService,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService,
    private _translate: TranslateService,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void {
    this.page_number = 1;
    this.start  = 10;
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.community_name = localStorage.getItem("community_name");
    this.language = localStorage.getItem("language");
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);   
    meeting_post.append('start', '0'); 
    this.authService.common('getCommunityWisePanicAlert',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.panic_alert = res['data'];   
        console.log(this.panic_alert);  
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
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
  getData(isFirstLoad,event){
    this.page_number++;
    this.start1 = (this.page_number-1) * this.start; 
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('start', this.start1);
    this.authService.common('getCommunityWisePanicAlert',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        //this.service_list = res['data'];
        for (let i = 0; i < res['data'].length; i++) {
          this.panic_alert.push(res['data'][i]);
        }
        if (isFirstLoad)
          event.target.complete();
       
          //console.log(this.panic_alert);  
      }else{
        event.target.complete();
      }
      })

    
  }
  doInfinite(event) {
    this.getData(true,event);
  }
  changeStatus(id,status){
    this.alert.presentConfirm(this._translate.instant('PopUp.alert_label'),this._translate.instant('PopUp.status_label'),this._translate.instant('Common.no_label'),this._translate.instant('Common.yes_label')).then(res => {
      if(res == 'ok'){
        let meeting_post = new FormData();
        meeting_post.append('user_type', this.user_type);
        meeting_post.append('user_id', this.user_id); 
        meeting_post.append('community_id', this.community_id);
        meeting_post.append('status', status);
        meeting_post.append('panic_id', id);
        this.authService.common('changePanicAlert',meeting_post).subscribe((res) => {
          if(res['success']=='1'){
            this.toastService.presentToast(res['message']);
            this.ionViewWillEnter();
          }else{
            this.toastService.presentToast(res['message']);
          }
        })
      }
    })
  }
  deletePanic(id){
    this.alert.presentConfirm(this._translate.instant('PopUp.alert_label'),this._translate.instant('PopUp.delete_label'),this._translate.instant('Common.no_label'),this._translate.instant('Common.yes_label')).then(res => {
      if(res == 'ok'){
        let meeting_post = new FormData();
        meeting_post.append('user_type', this.user_type);
        meeting_post.append('user_id', this.user_id); 
        meeting_post.append('community_id', this.community_id);
        meeting_post.append('panic_id', id);
        this.authService.common('deletePanic',meeting_post).subscribe((res) => {
          if(res['success']=='1'){
            this.toastService.presentToast(res['message']);
            this.ionViewWillEnter();
          }else{
            this.toastService.presentToast(res['message']);
          }
        })
      }
    })
  }
  async openMap(lat,long) {
    const modal = await this.modalController.create({
      component: ShowMapPage,
      cssClass: 'my-custom-modal map-modal',
      backdropDismiss:false,
      componentProps: {
        'lat': lat,
        'long' : long
      }
    });
    return await modal.present();
  }
  addSOSToStaff(id){
    this.alert.presentConfirm(this._translate.instant('PopUp.alert_label'),this._translate.instant('PopUp.sos_alert'),this._translate.instant('Common.no_label'),this._translate.instant('Common.yes_label')).then(res => {
      if(res == 'ok'){
        let meeting_post = new FormData();
        meeting_post.append('user_type', this.user_type);
        meeting_post.append('user_id', this.user_id); 
        meeting_post.append('community_id', this.community_id);
        meeting_post.append('community_name', this.community_name);
        meeting_post.append('panic_id', id);
        this.authService.common('addSecurityStaffSOS',meeting_post).subscribe((res) => {
          if(res['success']=='1'){
            this.toastService.presentToast(res['message']);
          }else{
            this.toastService.presentToast(res['message']);
          }
        })
      }
    })
  }
}
