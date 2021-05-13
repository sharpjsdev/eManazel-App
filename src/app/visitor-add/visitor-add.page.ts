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
  selector: 'app-visitor-add',
  templateUrl: './visitor-add.page.html',
  styleUrls: ['./visitor-add.page.scss'],
})
export class VisitorAddPage implements OnInit {
  user_type: string;
  community_id: string;
  user_id: string;
  flats: any;
  visitor_type: any;
  labour_type_array: any;
  code: any;
  zone: any;
  date:any;
  time:any;
  img1 : any = [];
  members: any;
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
    this.visitor_type = [{"id":"0","name":"family and Friends"},{"id":"1","name":"Labour,Materials and Equipments"}];
    this.labour_type_array = [{"id":"0","name":"Entry of workers"},{"id":"1","name":"Entry of building materials"},{"id":"2","name":"Entry of concrete materials"},{"id":"3","name":"Entry of water tank"},{"id":"4","name":"Entry of water tank"},{"id":"5","name":"Enrty of heavy construction equipment"}];
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
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
          console.log(this.flats);
        }
      })
    }
    
      this.authService.common('getCountryCodes',flat_post).subscribe((res) => {
        if(res['success']=='1'){
          this.code = res['data'];
          console.log(this.code);
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
  selectLabour(event){
    var val = event.target.value;
    if(val == 1){
      $("#labour_div").css("display","block");
    }else{
      $("#labour_div").css("display","none");
    }
  }
  onUploadChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event:any) => {
        this.img1 = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);  // to trigger onload
    }
    
    let fileList: FileList = event.target.files;  
    let file: File = fileList[0];
  
  }
  visitorForm(form){
    this.ionLoader.showLoader();
    var vehicle = "";
    var vehicle1 = "";
    var vehicle2 = "";
    var vehicle3 = "";
    var v1N  =  form.value.vehicle1N;
    var v1L1 = form.value.vehicle1L1;
    var v1L2 = form.value.vehicle1L2;
    var v1L3 = form.value.vehicle1L3;
    if (v1N != null && v1L1 != null && v1L2 != null && v1L3 != null) {
        vehicle1 = v1N + '-' + v1L1 + v1L2 + v1L3;
        vehicle = vehicle + vehicle1;

        }
        var v2N = form.value.vehicle2N;
        var v2L1 = form.value.vehicle2L1;
        var v2L2 = form.value.vehicle2L2;
        var v2L3 = form.value.vehicle2L3;

        if (v2N != null && v2L1 != null && v2L2 != null && v2L3 != null) {

            vehicle2 = v2N + '-' + v2L1 + v2L2 + v2L3;

            if (vehicle != '')

                vehicle = vehicle + ':' + vehicle2;

            else

                vehicle = vehicle + vehicle2;

        }

        var v3N = form.value.vehicle3N;
        var v3L1 = form.value.vehicle3L1;
        var v3L2 = form.value.vehicle3L2;
        var v3L3 = form.value.vehicle3L3;

        if (v3N != null && v3L1 != null && v3L2 != null && v3L3 != null) {

          vehicle3 = v3N + '-' + v3L1 + v3L2 + v3L3;

            if (vehicle != '')

                vehicle = vehicle + ':' + vehicle3;

            else

                vehicle = vehicle + vehicle3;

        }
    var type;
    if(form.value.v_type == '1'){
      type = form.value.type;
    }else{
      type = "";
    }
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
    var vehicle_number = vehicle;
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('name', form.value.v_name);        
    meeting_post.append('visit_date', form.value.date);        
    meeting_post.append('visit_time', form.value.time);        
    meeting_post.append('visit_days', form.value.visit_days);        
    meeting_post.append('flat_id', form.value.unit);        
    meeting_post.append('info', info);        
    meeting_post.append('code', form.value.std_code);        
    meeting_post.append('mobile', form.value.mobile);  
    if(this.user_type == '4'){
      meeting_post.append('member_id', this.user_id); 
    }      
    meeting_post.append('guest_type', form.value.v_type);        
    meeting_post.append('email', form.value.email);        
    meeting_post.append('type',type);        
    meeting_post.append('image',imge);        
    meeting_post.append('vehicle',vehicle_number); 
    this.authService.common('addGuest',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/visitor-list']); 
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
  }
  moveFocus(nextElement) {
    nextElement.setFocus();
    console.log(nextElement);
  }
}
