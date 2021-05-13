import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { TranslateConfigService } from '../services/translate-config.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile:any = {};
  appUrl: string;
  user_type: string;
  community_id: string;
  user_id: string;
  language: string;
  notification_count: any;
  constructor(
    private translateConfigService: TranslateConfigService,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private platform : Platform,
    private popoverController: PopoverController,
    private event : EventService
  ) { 
    this.translateConfigService.setLanguage(localStorage.getItem('language'));
  }

  ngOnInit() {
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
  }
  ionViewWillEnter(){
    this.profile.user_type = localStorage.getItem("user_type");
    this.profile.user_id = localStorage.getItem("user_id");
    this.appUrl = this.authService.appUrl();
    this.ionLoader.showLoader();
    let profile_post = new FormData();
    profile_post.append('user_type', this.profile.user_type);
    profile_post.append('user_id', this.profile.user_id);      
    this.authService.common('getProfile',profile_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.profile = res['data'];        
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
}
