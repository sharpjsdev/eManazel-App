import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-apply-community',
  templateUrl: './apply-community.page.html',
  styleUrls: ['./apply-community.page.scss'],
})
export class ApplyCommunityPage implements OnInit {
  language: string;
  user_type: string;
  community_id: string;
  user_id: string;
  city_list:any = [];
  district_list:any = [];
  area_unitss: any = [];
  notification_count: any;
  constructor(
    private authService : AuthService,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.language = localStorage.getItem('language');
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.ionLoader.showLoader();
    this.authService.common('getCity',"").subscribe((res) => {
      if(res['success'] == 1){
        this.ionLoader.hideLoader();
        this.city_list = res['data'];
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
    let meeting_post = new FormData();
    meeting_post.append('user_type',this.user_type);
    meeting_post.append('user_id',this.user_id);
    this.authService.common('getunits', meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.area_unitss = res['data'];
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
  selectCity(ev){
    var city_id = ev.target.value;
    if(city_id!=''){
      this.ionLoader.showLoader();
      let meeting_post = new FormData();
      meeting_post.append('city_id',city_id);
      this.authService.common('getArea',meeting_post).subscribe((res) => {
        if(res['success'] == 1){
          this.ionLoader.hideLoader();
          this.district_list = res['data'];
        }else{
          this.ionLoader.hideLoader();
          this.toastService.presentToast(res['message']);
        }
      })
    }
  }

  submitForm(form){
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_name', form.value.c_name);
    meeting_post.append('city_id', form.value.c_id);
    meeting_post.append('district_id', form.value.d_id);
    meeting_post.append('zip_code', form.value.zip_code);
    meeting_post.append('area', form.value.area);
    meeting_post.append('area_unit', form.value.area_unit);
    meeting_post.append('address', form.value.address);
    this.authService.common('applyForCommunity',meeting_post).subscribe((res) => {
      if(res['success'] == 1){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/dashboard']);
        //this.authService.logout();
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
  }
}
