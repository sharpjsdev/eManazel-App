import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-violation-list',
  templateUrl: './violation-list.page.html',
  styleUrls: ['./violation-list.page.scss'],
})
export class ViolationListPage implements OnInit {
  language: string;
  user_type: string;
  community_id: string;
  user_id: string;
  violation:any = [];
  appUrl: any;
  community_staff_type: string;
  notification_count: any;
  constructor(
    private authService : AuthService,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.appUrl = this.authService.appUrl();
    this.language = localStorage.getItem('language');
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.community_staff_type = localStorage.getItem("community_staff_type");
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('keyword', '');
    meeting_post.append('start', '');
    this.authService.common('getAllCitation',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.violation = res['data'];
        console.log(this.violation)
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
  searchByKeyword(ev){
    var keyword = ev.target.value;
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('keyword', keyword);
    meeting_post.append('start', '');
    this.authService.common('getAllCitation',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.violation = res['data'];
      }else{
        this.violation = [];
       this.toastService.presentToast(res['message']);
      }
      })
  }
}
