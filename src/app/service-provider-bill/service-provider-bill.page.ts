import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-service-provider-bill',
  templateUrl: './service-provider-bill.page.html',
  styleUrls: ['./service-provider-bill.page.scss'],
})
export class ServiceProviderBillPage implements OnInit {
  bills: any = [];
  app_url: string;
  user_type: string;
  user_id: string;
  community_id: string;
  sum_total: any;
  total_collection: any;
  total_p_collection: any;
  total_c_collection: any;
  provider_type: string;
  notification_count: any;
  language: string;
  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private router : Router,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void {;
    this.app_url = this.authService.appUrl(); 
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.provider_type = localStorage.getItem("service_type_id");
    this.language = localStorage.getItem('language');
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('provider_type', this.provider_type);
    this.authService.common('getServiceProviderBill',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.bills = res['data'];
        console.log(this.bills); 
      }else if(res['success']=='2'){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/dashboard']);
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
      this.authService.common('externalServiceStatusGraph',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.sum_total = res['data']; 
          this.total_collection = this.sum_total.total_payment;
          this.total_p_collection = this.sum_total.total_provider_payment;
          this.total_c_collection = this.sum_total.total_community_payment;
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
