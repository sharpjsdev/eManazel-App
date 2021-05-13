import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.page.html',
  styleUrls: ['./event-add.page.scss'],
})
export class EventAddPage implements OnInit {
  start_time: string;
  start_date: string;
  user_type: string;
  community_id: string;
  user_id: string;
  flats: any;
  end_date:any;
  end_time:any;
  img1 : any = [];
  myFile: any = [];
  members: any;
  zone: any;
  language: string;
  notification_count: any;
  constructor(
    private authService : AuthService,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    private datePicker: DatePicker,
    private router: Router,
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
    this.language = localStorage.getItem('language');
    let flat_post = new FormData();
    flat_post.append('user_type', this.user_type);
    flat_post.append('user_id', this.user_id); 
    flat_post.append('community_id', this.community_id);
    if(this.user_type == '4'){
      this.authService.common('getGroup',flat_post).subscribe((res) => {
        if(res['success']=='1'){
          this.zone = res['data']; 
        }
      })
    }else{
      this.authService.common('getMemberFlats',flat_post).subscribe((res) => {
        if(res['success']=='1'){
          this.flats = res['data'];  
        }
      })
    }
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
  showDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.start_date = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
  onUploadChange(event) {
    // if (event.target.files && event.target.files[0]) {
    //   let reader = new FileReader();
    //   reader.onload = (event:any) => {
    //     this.img1 = event.target.result;
    //   }
    //   reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    // }
    
    // let fileList: FileList = event.target.files;  
    // let file: File = fileList[0];
    this.myFile = event.target.files;
  
  }
  getFlatFromZone(ev){
    var zone_id = ev.target.value;
    if(zone_id!=''){
      let flat_post = new FormData();
      flat_post.append('user_type', this.user_type);
      flat_post.append('user_id', this.user_id); 
      flat_post.append('community_id', this.community_id);
      flat_post.append('group_id', zone_id);
      this.authService.common('getFlatFromGroupId',flat_post).subscribe((res) => {
        if(res['success']=='1'){
          this.flats = res['data'];
        }
      })
    }
  }
  getMemeberFromFlat(ev){
    var flat_id = ev.target.value;
    if(this.user_type != '5'){
      if(flat_id!=''){
        let flat_post = new FormData();
        flat_post.append('user_type', this.user_type);
        flat_post.append('user_id', this.user_id); 
        flat_post.append('community_id', this.community_id);
        flat_post.append('flat_id', flat_id);
        this.authService.common('getFlatMembers',flat_post).subscribe((res) => {
          if(res['success']=='1'){
            this.members = res['data'];
          }
        })
      }
    }
  }
  // Show only time
  showTime() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      time => {        
        this.start_time =  this.formatAMPM(time);
      },
      err => console.log('Error occurred while getting time: ', err)
    );
  }
  showDate1() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.end_date = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  // Show only time
  showTime1() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      time => {        
        this.end_time =  this.formatAMPM(time);
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

  eventForm(form){
    this.ionLoader.showLoader();
    var imge;
    var img_text = $('input[type=file]')[0].files[0];
    if(img_text == undefined){
      imge = "";
    }else{
      imge = $('input[type=file]')[0].files[0];
    }
    var info;
    if(form.value.info == null){
      info="";
    }else{
      info = form.value.info;
    }
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('title', form.value.title);        
    meeting_post.append('start_date', form.value.start_date);        
    meeting_post.append('start_time', form.value.start_time);        
    meeting_post.append('description', form.value.desc);        
    meeting_post.append('flat_id', form.value.unit);        
    meeting_post.append('address', form.value.address);        
    meeting_post.append('end_date', form.value.end_date);        
    meeting_post.append('end_time', form.value.end_time);     
    if(this.user_type == '4'){
      meeting_post.append('member_id', form.value.member_id); 
      meeting_post.append('status', '1'); 
    }     
    meeting_post.append('price', form.value.price);  
    for  (var i =  0; i <  this.myFile.length; i++)  {  
      meeting_post.append("images[]",  this.myFile[i]);
  } 
    this.authService.common('addEvent',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/my-events']); 
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
  }
}
