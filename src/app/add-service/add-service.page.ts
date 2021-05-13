import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.page.html',
  styleUrls: ['./add-service.page.scss'],
})
export class AddServicePage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  category: any = [];
  type: any = [];
  service: any = [];
  language: any;
  is_free: any = false;
  is_deposit: any =false;
  price:any=0;
  deposit:any=0;
  if_free_value: any = 0;
  if_deposit_value: any = 1;
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
    this.language = localStorage.getItem("language");
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    this.authService.common('getCommunityServiceCategory',meeting_post).subscribe((res1) => {
      if(res1['success']=='1'){
        this.category = res1['data']; 
        console.log(this.category); 
      }
    })
    this.checkNotification();
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
  selectType(ev){
    var category_id = ev.target.value;
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('language', this.language);
    meeting_post.append('category', category_id);
    this.authService.common('getServiceTypeForApp',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.type = res['data'];  
      }else{
        this.type = [];
      }
    })
  }
  selectService(ev){
    var type_id = ev.target.value;
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('type', type_id);
    this.authService.common('getMaintenanceServicesForApp',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.service = res['data']; 
      }else{
        this.service =[];
      }
    })
  }
  is_free_change(ev){
    this.is_free = ev.target.checked;
    if(this.is_free == true){
      this.if_free_value = 1;
    }else{
      this.if_free_value = 0;
    }
    
  }
  is_deposit_change(ev){
    this.is_deposit = ev.target.checked;
    if(this.is_deposit == true){
      this.if_deposit_value = 0;
    }else{
      this.if_deposit_value = 1;
    }
  }

  save(form){
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('service_id', form.value.service_id);
    meeting_post.append('price', this.price);
    meeting_post.append('deposit', this.deposit);
    meeting_post.append('is_free', this.if_free_value);
    meeting_post.append('isDeposit', this.if_deposit_value);
    this.authService.common('addService',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.toastService.presentToast(res['message']); 
      }else{
        this.toastService.presentToast(res['message']); 
      }
    })
  }
}
