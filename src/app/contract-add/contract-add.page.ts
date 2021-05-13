import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.page.html',
  styleUrls: ['./contract-add.page.scss'],
})
export class ContractAddPage implements OnInit {
  user_type: string;
  community_id: string;
  user_id: string;
  flats: any;
  unitType: any [];
  groups: any [];
  language: string;
  countryCode: any;
  date: string;
  time1: string;
  check_in: string;
  check_out: string;
  time_in: string;
  time_out: string;
  provider_id: string;
  notification_count: any;
  constructor(
    private authService : AuthService,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private datePicker: DatePicker,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.provider_id = localStorage.getItem("provider_id");
    this.language = localStorage.getItem("language");
    let flat_post = new FormData();
    flat_post.append('user_type', this.user_type);
    flat_post.append('user_id', this.user_id); 
    flat_post.append('community_id', this.community_id);
    this.authService.common('getGroup',flat_post).subscribe((res) => {
      if(res['success']=='1'){
        this.groups = res['data'];
      }
    })
    this.authService.common('getFlat',flat_post).subscribe((res) => {
      if(res['success']=='1'){
        this.flats = res['data'];
      }
    })
    this.authService.common('getFlatTypes',"").subscribe((res) => {
      if(res['success']=='1'){
        this.unitType = res['data'];
      }
    })
    this.authService.common('getCountryCodes',"").subscribe((res) => {
      if(res['success']=='1'){
        this.countryCode = res['data'];
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
  contractForm(form){
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('provider_id', this.provider_id);
    meeting_post.append('group', form.value.group);        
    meeting_post.append('total_person', form.value.total_person);        
    meeting_post.append('paid_amount', form.value.paid_amount);   
    meeting_post.append('unit', form.value.unit);        
    meeting_post.append('unit_type', form.value.unit_type);    
    meeting_post.append('t_name', form.value.t_name);        
    meeting_post.append('id_number', form.value.id_number);   
    meeting_post.append('country_code', form.value.country_code);        
    meeting_post.append('mobile', form.value.mobile);  
    meeting_post.append('email', form.value.email);        
    meeting_post.append('guest_name', form.value.guest_name); 
    meeting_post.append('check_in', form.value.check_in);        
    meeting_post.append('time_in', form.value.time_in);  
    meeting_post.append('check_out', form.value.check_out);        
    meeting_post.append('time_out', form.value.time_out);
    this.authService.common('addContract',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/contracts']); 
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
  }
  checkInDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.check_in = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  checkOutDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.check_out = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  // Show only time
  TimeIn() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      time => {        
        this.time_in =  this.formatAMPM(time);
      },
      err => console.log('Error occurred while getting time: ', err)
    );
  }

  TimeOut() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      time => {        
        this.time_out =  this.formatAMPM(time);
      },
      err => console.log('Error occurred while getting time: ', err)
    );
  }
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm; 
    return strTime;
  }
 
  

}
