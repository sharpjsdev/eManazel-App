import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-join-community',
  templateUrl: './join-community.page.html',
  styleUrls: ['./join-community.page.scss'],
})
export class JoinCommunityPage implements OnInit {
  join_as: any = [];
  community: any = [];
  user_id: string;
  user_type: string;
  selected_com:any;
  flats: any;
  floor: any;
  area: any;
  selected_com_id: any;
  community_id: string;
  language: string;
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
    this.user_id = localStorage.getItem("user_id");
    this.user_type = localStorage.getItem("user_type");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    this.checkNotification();
    //this.join_as = [{"id":"5","name":"Society Member"},{"id":"2","name":"Service Provider"},{"id":"3","name":"Government Agent"}];
    if(this.user_type == '5'){
      this.join_as = 'Society Member';
    }
  }
  getCommunity(ev){
    var keyword = ev.target.value;
    let com_post = new FormData();
    com_post.append('user_id', this.user_id); 
    com_post.append('keyword', keyword); 
    this.authService.common('searchCommunity',com_post).subscribe((res) => {
      if(res['success']=='1'){
        this.community = res['data'];
        console.log(this.community);
        this.flats = [];
      }
    })
  
  }
  selectCommunity(com_id,com_name){
    this.selected_com = com_name;
    this.selected_com_id = com_id;
    this.community = [];
    let flat_post = new FormData();
    flat_post.append('user_type', this.user_type);
    flat_post.append('user_id', this.user_id); 
    flat_post.append('community_id', com_id);
    this.authService.common('getFlat',flat_post).subscribe((res) => {
      if(res['success']=='1'){
        this.flats = res['data'];
      }else{
        this.flats = [];
      }
      })
  }
  getFlatDetails(ev){
    var flat_id = ev.target.value;
    let flat_post = new FormData();
    flat_post.append('user_type', this.user_type);
    flat_post.append('user_id', this.user_id); 
    flat_post.append('flat_id', flat_id);
    this.authService.common('getFlatDetails',flat_post).subscribe((res) => {
      if(res['success']=='1'){
        this.floor = res['data'].floor;
        this.area = res['data'].area+' '+res['data'].unit;
      }
      })
  }
  communityForm(form){
    let community_post = new FormData();
    community_post.append('user_type', this.user_type);
    community_post.append('user_id', this.user_id); 
    community_post.append('flat_id', form.value.unit);
    community_post.append('community_name', form.value.selected_com);
    community_post.append('community_id', form.value.selected_com_id);
    community_post.append('floor', form.value.floor);
    community_post.append('area', form.value.area);
    this.authService.common('joinCommunity',community_post).subscribe((res) => {
      if(res['success']=='1'){
        this.toastService.presentToast(res['message']);
      }else{
        this.toastService.presentToast(res['message']);
      }
    })
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
