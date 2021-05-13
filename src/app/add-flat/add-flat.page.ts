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
  selector: 'app-add-flat',
  templateUrl: './add-flat.page.html',
  styleUrls: ['./add-flat.page.scss'],
})
export class AddFlatPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  groups: any = [];
  language: any;
  code: any;
  area_unit: any;
  is_empty:any =0;
  owner_stay:any=0;
  c_code: string;
  a_unit: string;
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
    this.c_code = localStorage.getItem("community_country_code");
    this.a_unit = localStorage.getItem("community_area_unit_id");
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    this.authService.common('getGroup',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.groups = res['data'];
      }
    })
    this.authService.common('getCountryCodes',"").subscribe((res) => {
      if(res['success']=='1'){
        this.code = res['data'];
      }
    })
    this.authService.common('getAreaUnit',"").subscribe((res) => {
      if(res['success']=='1'){
        this.area_unit = res['data'];
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
  is_empty_change(ev){
    var check = ev.target.checked;
    if(check == true){
      this.is_empty = 1;
    }else{
      this.is_empty = 0;
    }
  }
  owner_stay_change(ev){
    var check = ev.target.checked;
    if(check == true){
      this.owner_stay = 1;
    }else{
      this.owner_stay = 0;
    }
  }
  save(form){
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id); 
    meeting_post.append('number', form.value.unit_no); 
    meeting_post.append('group_id', form.value.group_name); 
    meeting_post.append('building_number', form.value.b_name); 
    meeting_post.append('floor', form.value.floor); 
    meeting_post.append('area', form.value.area); 
    meeting_post.append('mobile', form.value.mobile); 
    meeting_post.append('unit_id', form.value.area_unit_id); 
    meeting_post.append('owner_stay', this.owner_stay); 
    meeting_post.append('is_empty', this.is_empty); 
    this.authService.common('addFlat',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/flat-list']);
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })

  }

}
