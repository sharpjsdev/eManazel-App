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
  selector: 'app-edit-notice',
  templateUrl: './edit-notice.page.html',
  styleUrls: ['./edit-notice.page.scss'],
})
export class EditNoticePage implements OnInit {
  notice_id: any;
  notice: any = {};
  user_id : any;
  user_type : any;
  community_id : any;
  public is_imp: boolean;
  language: string;
  isToggled: boolean;
  notification_count: any;
  constructor(
    private toastService: ToastService,
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
        console.log(this.notice);
        if(this.notice.is_important == 1){
          this.is_imp = true;
        }else{
          this.is_imp = false;
        }
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
  noticeForm(form){
    var is_imp1;
    if(this.isToggled == false){
      is_imp1 = 0;
    }else{
      is_imp1 = 1;
    }
    this.ionLoader.showLoader();
    let add_post = new FormData();
    add_post.append('user_type', this.user_type);
    add_post.append('user_id', this.user_id); 
    add_post.append('community_id', this.community_id);
    add_post.append('subject', form.value.subject);
    add_post.append('description', form.value.desc);
    add_post.append('is_important', is_imp1);
    add_post.append('notice_id', this.notice_id);   
    this.authService.common('updateNotice',add_post).subscribe((res) => {
      if(res['success']=='1'){
        console.log(res['data']);
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/notice-list'])    ; 
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
        
  }
  is_imp_change(ev){
    
    this.isToggled = ev.target.checked; 
    console.log("Toggled: "+ this.isToggled); 
  }
}
