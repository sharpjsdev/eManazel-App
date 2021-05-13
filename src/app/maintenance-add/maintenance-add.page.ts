import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-maintenance-add',
  templateUrl: './maintenance-add.page.html',
  styleUrls: ['./maintenance-add.page.scss'],
})
export class MaintenanceAddPage implements OnInit {
  time: any;
  user_type: string;
  user_id: string;
  community_id: string;
  maintenance: any = [];
  language: any;
  units: any = [];
  category: any = [];
  type: any = [];
  service: any = [];
  members: any = [];
  staffs: any = [];
  price: any;
  unit_id:any;
  myFile: any;
  date:any;
  time1: string;
  community_staff_type: string;
  pay_status : any = "";
  zone: any;
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private datePicker: DatePicker,
    private ionLoader: LoaderService,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  selectTime(ev){
    this.time = ev.target.value;
  }
  ionViewWillEnter(): void {
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.community_staff_type = localStorage.getItem("community_staff_type");
    this.language = localStorage.getItem("language");
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    if(this.user_type == '4' || this.community_staff_type == '6'){
      this.authService.common('getGroup',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.zone = res['data']; 
        }
      })
      this.authService.common('getMaintenanceStaffByCommunity',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.staffs = res['data']; 
        }
      })
    }else{
      this.authService.common('getMemberFlats',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.units = res['data'];  
        }
      })
    } 
    
    this.authService.common('getCommunityServiceCategory',meeting_post).subscribe((res1) => {
      if(res1['success']=='1'){
        this.category = res1['data']; 
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
          this.units = res['data'];
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
    this.authService.common('getCommunityWiseServicesForApp',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.service = res['data']; 
      }else{
        this.service =[];
      }
    })
  }
  selectServicePrice(ev){
    var service_id = ev.target.value;
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('service_id', service_id);
    this.authService.common('getServicePriceForApp',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.price = res['data'].price; 
      }
    })
  }
  onUploadChange(ev) {
    this.myFile = ev.target.files;
  }
  save(form){
    var memo;
    var time_from;
    var time_to;
    if(form.value.memo == undefined){
      memo = '';
    }else{
      memo = form.value.memo;
    }
    if(form.value.time_from == undefined){
      time_from = '';
    }else{
      time_from = form.value.time_from;
    }
    if(form.value.time_to == undefined){
      time_to = '';
    }else{
      time_to = form.value.time_to;
    }
    var img;
    var img_text = $('input[type=file]')[0].files[0];
    if(img_text == undefined){
      img = "";
    }else{
      img = $('input[type=file]')[0].files[0];
    }
  this.ionLoader.showLoader();
  let add_post = new FormData();
  add_post.append('user_type', this.user_type);
  add_post.append('user_id', this.user_id); 
  add_post.append('community_id', this.community_id);
  add_post.append('flat_id', form.value.unit_id);
  add_post.append('service_id', form.value.service_id);
  add_post.append('price', form.value.price);
  add_post.append('time_from', time_from);
  add_post.append('time_to', time_to);
  add_post.append('on_date', form.value.date);
  if(this.user_type!='5'){
    add_post.append('staff_id', form.value.assign_staff);
    add_post.append('member_id', form.value.member_id);
    add_post.append('pay_status', this.pay_status);
  }  
  add_post.append('memo', memo); 
  add_post.append("image",  img);
  this.authService.common('placeMaintainanceRequest',add_post).subscribe((res) => {
    if(res['success']=='1'){
      console.log(res['data']);
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
      this.router.navigate(['/maintenance-list'])    ; 
    }else{
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
    }
  })
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
        this.time1 =  this.formatAMPM(time);
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
  test(ev){
    console.log(ev)
  }
  selectPriceType(ev){
    this.pay_status = ev.target.value;
  }
}
