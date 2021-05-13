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
  selector: 'app-edit-bank',
  templateUrl: './edit-bank.page.html',
  styleUrls: ['./edit-bank.page.scss'],
})
export class EditBankPage implements OnInit {
  app_url: string;
  user_type: string;
  user_id: string;
  community_id: string;
  bank_id: any;
  bank : any = [];
  language: string;
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
  }
  ionViewWillEnter(): void {
    this.ionLoader.showLoader();
    this.bank_id =this.route.snapshot.params['id']; 
    this.app_url = this.authService.appUrl(); 
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem('language');
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('bank_id', this.bank_id);
    this.authService.common('getBankById',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.bank = res['data']; 
        //console.log(this.bank);
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
save(form){
  this.ionLoader.showLoader();    
  let meeting_post = new FormData();
  meeting_post.append('user_type', this.user_type);
  meeting_post.append('user_id', this.user_id); 
  meeting_post.append('community_id', this.community_id);
  meeting_post.append('acc_no', form.value.acc_no);        
  meeting_post.append('bank_name', form.value.bank_name);        
  meeting_post.append('branch', form.value.branch);  
  meeting_post.append('bank_id', this.bank_id);  
  this.authService.common('updateBank',meeting_post).subscribe((res) => {
    if(res['success']=='1'){
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
      this.router.navigate(['/bank']); 
    }else{
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
    }
    })
}
}
