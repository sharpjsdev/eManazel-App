import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-service-provider-agreement',
  templateUrl: './service-provider-agreement.page.html',
  styleUrls: ['./service-provider-agreement.page.scss'],
})
export class ServiceProviderAgreementPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  agreement: any = [];
  language: any;
  response_time: any;
  resolution_time: any;
  memo: any;
  commision: any;
  attachment: any;
  id:any;
  user_name: string;
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
    this.ionLoader.showLoader();
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");    
    this.user_name = localStorage.getItem("user_name");    
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id); 
    this.authService.common('getServiceProviderAgreement',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.agreement = res['data'];  
        this.response_time = this.agreement.response_time;
        this.resolution_time = this.agreement.resolution_time;
        this.memo = this.agreement.memo;
        this.commision = this.agreement.commision;
        this.attachment = this.agreement.attachment;
        this.id = this.agreement.id;
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
agreementForm(form){
  this.ionLoader.showLoader();
  var img;
  var img_text = $('input[type=file]')[0].files[0];
  if(img_text == undefined){
    img = "";
  }else{
    img = $('input[type=file]')[0].files[0];
  }
  let meeting_post = new FormData();
  meeting_post.append('user_type', this.user_type);
  meeting_post.append('user_id', this.user_id); 
  meeting_post.append('community_id', this.community_id); 
  meeting_post.append('response_time', this.response_time); 
  meeting_post.append('resolution_time', this.resolution_time); 
  meeting_post.append('commision', this.commision); 
  meeting_post.append('user_name', this.user_name); 
  meeting_post.append('memo', this.memo); 
  meeting_post.append('id', this.id); 
  meeting_post.append("image",  img);
  meeting_post.append("old_file",  this.attachment);
  this.authService.common('addServiceProviderAgreement',meeting_post).subscribe((res) => {
    if(res['success']=='1'){
      this.ionLoader.hideLoader();
      this.agreement = res['data'];  
      this.response_time = this.agreement.response_time;
      this.resolution_time = this.agreement.resolution_time;
      this.memo = this.agreement.memo;
      this.commision = this.agreement.commision;
      this.attachment = this.agreement.attachment;
      this.id = this.agreement.id;
      this.toastService.presentToast(res['message']);
    }else{
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
    }
  })
}
}