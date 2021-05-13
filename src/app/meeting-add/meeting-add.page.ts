import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import {AlertService} from '../services/alert.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-meeting-add',
  templateUrl: './meeting-add.page.html',
  styleUrls: ['./meeting-add.page.scss'],
})
export class MeetingAddPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  group_list: any = [];
  language: any;
  members: any;
  show_div: string;
  time: string;
  date: string;
  member_id:any = "" ;
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private alert: AlertService,
    private datePicker: DatePicker,
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
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    this.authService.common('getGroupNotification',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.group_list = res['data'];   
        console.log(this.group_list);  
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
  getAssignedMember(ev){
    var group_id = ev.target.value;
    if(group_id!='all' && group_id!='' ){
      this.show_div = "yes";
      let meeting_post = new FormData();
      meeting_post.append('user_type', this.user_type);
      meeting_post.append('user_id', this.user_id); 
      meeting_post.append('community_id', this.community_id);
      meeting_post.append('group_id', group_id);
      this.authService.common('getAssignedMemberToGroup',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.ionLoader.hideLoader();
          this.members = res['data'];   
        }else{
          this.ionLoader.hideLoader();
          this.toastService.presentToast(res['message']);
        }
      })
    }else{
      this.show_div = "no";
    }
  }

  showDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.date = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  // Show only time
  showTime() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      time => {        
        this.time =  this.formatAMPM(time);
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

  meetingForm(form){
    console.log(this.member_id);
      this.ionLoader.showLoader();
      let meeting_post = new FormData();
      meeting_post.append('user_type', this.user_type);
      meeting_post.append('user_id', this.user_id); 
      meeting_post.append('community_id', this.community_id);
      meeting_post.append('group', form.value.group);
      meeting_post.append('subject', form.value.subject);
      meeting_post.append('description', form.value.desc);
      meeting_post.append('date', form.value.date);
      meeting_post.append('time', form.value.time);
      meeting_post.append('time', form.value.time);
      if(this.member_id!=""){
        meeting_post.append('member',this.member_id);
      }else{
        meeting_post.append('member',"");
      }
      this.authService.common('addMeeting',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.ionLoader.hideLoader();
          this.members = res['data'];   
        }else{
          this.ionLoader.hideLoader();
          this.toastService.presentToast(res['message']);
        }
    }) 
  }
}
