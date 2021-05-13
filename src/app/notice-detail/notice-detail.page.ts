import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { AlertService } from '../services/alert.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-notice-detail',
  templateUrl: './notice-detail.page.html',
  styleUrls: ['./notice-detail.page.scss'],
})
export class NoticeDetailPage implements OnInit {
  notice: any = {};
  notice_id: any;
  app_url: string;
  user_type: string;
  user_id: string;
  community_id: string;
  language: string;
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private route : ActivatedRoute,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
    this.notice_id =this.route.snapshot.params['id']; 
    this.app_url = this.authService.appUrl(); 
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
  }
  ionViewWillEnter(): void {
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('notice_id', this.notice_id);        
    this.authService.common('getNoticeDetails',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.notice = res['data']; 
        //this.notice.images = this.notice.images;     
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
  deleteNoticeImage(image_id){
    this.alertService.presentConfirm('Confirm','Do you want to delete ?','No','Yes').then(res => {
      if(res == 'ok'){
        this.ionLoader.showLoader();
        let delete_post = new FormData();
        delete_post.append('user_type', localStorage.getItem("user_type"));
        delete_post.append('user_id', localStorage.getItem("user_id")); 
        delete_post.append('community_id', localStorage.getItem("community_id"));
        delete_post.append('notice_id', this.notice_id);  
        delete_post.append('image_id', image_id);      
        this.authService.common('deleteNoticeImage',delete_post).subscribe((res) => {
          if(res['success']=='1'){
            console.log(res['data']);
            this.ionLoader.hideLoader();
            this.toastService.presentToast(res['message']);
            //this.notice.images = this.notice.images;     
          }else{
            this.ionLoader.hideLoader();
            this.toastService.presentToast(res['message']);
          }
          })
      }
    });
    
  }
}
