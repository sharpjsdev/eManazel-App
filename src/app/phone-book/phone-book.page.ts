import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-phone-book',
  templateUrl: './phone-book.page.html',
  styleUrls: ['./phone-book.page.scss'],
})
export class PhoneBookPage implements OnInit {
  language: string;
  user_type: string;
  community_id: string;
  user_id: string;
  phoneBook:any = [];
  group: any;
  notification_count: any;
  section: string;
  contact: any;
  service_provider: any;
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
    this.section = "one";
  }
  ionViewWillEnter() {
    this.language = localStorage.getItem('language');
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.getPhoneBook();
    this.checkNotification();
  }
  getPhoneBook(){

    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('keyword', '');
    meeting_post.append('start', '0');
    this.authService.common('getPhoneBook',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.phoneBook = res['data'];
        //console.log(this.phoneBook);
      }else{
       this.ionLoader.hideLoader();
       this.toastService.presentToast(res['message']);
      }
      })
      let group_post = new FormData();
      group_post.append('user_type', this.user_type);
      group_post.append('user_id', this.user_id); 
      group_post.append('community_id', this.community_id);
      this.authService.common('getGroup',group_post).subscribe((res) => {
        if(res['success']=='1'){
          this.group = res['data'];
          //console.log(this.group);
        }
        })
  }
  getProvider(){
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('start', '0');
    this.authService.common('getServiceProviders',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.service_provider = res['data'];
        console.log(this.service_provider)
      }else{
        this.ionLoader.hideLoader();
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
  searchByKeyword(ev){
    var keyword = ev.target.value;
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('keyword', keyword);
    meeting_post.append('start', '0');
    this.authService.common('getPhoneBook',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.phoneBook = res['data'];
      }else{
       this.phoneBook =[];
       this.toastService.presentToast(res['message']);
      }
      })
  }
  searchByDropdown(ev){
    var dropdown = ev.target.value;
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('keyword', '');
    meeting_post.append('start', '0');
    meeting_post.append('dropdown', dropdown);
    this.authService.common('getPhoneBook',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.phoneBook = res['data'];
      }else{
       this.phoneBook =[];
       this.toastService.presentToast(res['message']);
      }
      })
  }
  openWp(code,no){
    var mobile = code+no;

    window.open('https://wa.me/'+mobile, '_system');
  }
  getEmergencyContact(){
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('keyword', '');
    meeting_post.append('start', '0');
    this.authService.common('getEmergencyContacts',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.contact = res['data'];
      }else{
       this.ionLoader.hideLoader();
       this.toastService.presentToast(res['message']);
      }
      })
  }
  segmentChanged(ev){
    var segment = ev.target.value;
    if(segment == 'one'){
      this.getPhoneBook();
    }if(segment == 'two'){
      this.getProvider();
    }if(segment == 'three'){
      this.getEmergencyContact();
    }
  }
}
