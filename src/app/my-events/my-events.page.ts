import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.page.html',
  styleUrls: ['./my-events.page.scss'],
})
export class MyEventsPage implements OnInit {
  user_type: string;
  community_id: string;
  user_id: string;
  event: any;
  appUrl: string;
  notification_count: any;
  language: string;
  constructor(
    private authService : AuthService,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private events : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.ionLoader.showLoader();
    this.appUrl = this.authService.appUrl();
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem('language');
    let flat_post = new FormData();
    flat_post.append('user_type', this.user_type);
    flat_post.append('user_id', this.user_id); 
    flat_post.append('community_id', this.community_id);
    this.authService.common('getCommunityEvents',flat_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.event = res['data'];
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
    this.events.publish('directiochanged', 'true');
    
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
}
