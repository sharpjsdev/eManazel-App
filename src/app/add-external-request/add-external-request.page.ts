import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-add-external-request',
  templateUrl: './add-external-request.page.html',
  styleUrls: ['./add-external-request.page.scss'],
})
export class AddExternalRequestPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  maintenance: any = [];
  language: any;
  units: any = [];
  category: any = [];
  type: any = [];
  service: any = [];
  display: string;
  type_idss: any;
  provider: any = [];
  provider_idds: any;
  item: any = [];
  members: any = [];
  item_idss: any;
  sub_ids: any;
  price: any;
  total = 0;
  public item_array: any[] = [{
    id: 1,
    item_names: '',
    item_na: '',
    price_new: '',
    qty: '',
    unit: ''
  }];
  from_time: string;
  date: string;
  to_time: string;
  time_to: string;
  time_from: string;
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
  ionViewWillEnter(): void {
    
    this.display = "display:none";
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id); 
    if(this.user_type == '4'){
      this.authService.common('getGroup',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.zone = res['data']; 
        }
      })
    }else{
      this.authService.common('getMemberFlats',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.units = res['data'];  
        }
      })
    }
    this.authService.common('getCommunityItemServiceType',meeting_post).subscribe((res1) => {
      if(res1['success']=='1'){
        this.category = res1['data']; 
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
    if(this.user_type == '4'){
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
  selectItemType(ev){
    var type_id = ev.target.value;
    if(type_id!=''){
      this.type_idss = type_id;
      if(type_id==2){
        this.display = "display:none";
      }else{
        this.display = "display:block";
      }
      let meeting_post = new FormData();
      meeting_post.append('type_id', type_id); 
      meeting_post.append('community_id', this.community_id); 
      this.authService.common('getServiceItemTypeForApp',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.type = res['data'];  
        }
      })
    }
  }
  selectService(ev){
    var item_id = ev.target.value;
    this.sub_ids = item_id;
    if(item_id!=''){
      if(this.type_idss == 2){
        this.service = [];
        let meeting_post = new FormData();
        meeting_post.append('item_id', item_id); 
        meeting_post.append('main_id', this.type_idss); 
        meeting_post.append('community_id', this.community_id); 
        this.authService.common('getProviderForApp',meeting_post).subscribe((res) => {
          if(res['success']=='1'){
            this.provider = res['data'];  
          }
        })
      }else{
        let meeting_post = new FormData();
        meeting_post.append('item_id', item_id); 
        meeting_post.append('community_id', this.community_id); 
        this.authService.common('getItemServicesForApp',meeting_post).subscribe((res) => {
          if(res['success']=='1'){
            this.service = res['data'];  
          }
        })
    }
    }
  }
  selectServiceProvider(ev){
    var item_id = ev.target.value;
    this.item_idss  = item_id;
    let meeting_post = new FormData();
    meeting_post.append('item_id', item_id); 
    meeting_post.append('main_id', this.type_idss); 
    meeting_post.append('community_id', this.community_id); 
    this.authService.common('getProviderForApp',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.provider = res['data'];  
      }
    })
  }
  selectServiceProviderItem(ev){
    this.provider_idds = ev.target.value;
    let meeting_post = new FormData();
    meeting_post.append('item_type', this.item_idss); 
    meeting_post.append('main_id', this.type_idss);
    meeting_post.append('sub_id', this.sub_ids); 
    meeting_post.append('provider', this.provider_idds); 
    meeting_post.append('community_id', this.community_id); 
    this.authService.common('getItemsForApp',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.item = res['data']; 
        console.log(this.item);
        if(this.type_idss!=2){
          this.price = res['data'][0]['price'];
        }else{
          this.price ="";
        }
        
      }
    })
  }
  selectItem(ev , div_id){
    
    var item_id = ev.target.value;
    if(item_id!=''){
      let meeting_post = new FormData();
      meeting_post.append('item_id', item_id); 
      meeting_post.append('provider', this.provider_idds); 
      meeting_post.append('community_id', this.community_id); 
      this.authService.common('getItemsPriceForApp',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.item_array[div_id] = ({item_names: res['data']['item_id'],item_na: res['data']['name'], price_new: res['data']['price'],qty: '1',unit: res['data']['unit']});
          this.changeQuantity(1);
        }
      })
    }
    
    
  }
  changeQuantity(ev){
    console.log(this.item_array);
    var sum = 0;
    for (let i of this.item_array) {
       sum += (i.price_new * i.qty);
      console.log(sum);
     }
     this.total = sum;

  }
  removeItems(i: number) {
    if(this.item_array.length == 1){
      alert('you cant remove last one');
    }else{
      this.item_array.splice(i, 1);
      this.changeQuantity(1);
    }
    
  }
  addItems() {
    this.item_array.push({
      id: this.item_array.length + 1,
      item_names: '',
      item_na: '',
      price_new: '',
      qty: 1,
      unit: ''
    });
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
        this.time_from =  this.formatAMPM(time);
      },
      err => console.log('Error occurred while getting time: ', err)
    );
  }
  showTime1() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      time => {        
        this.time_to =  this.formatAMPM(time);
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
  save(form){
    this.ionLoader.showLoader();
    var total_amt;
    var price;
    var service_id;
    if(this.type_idss == 2){
       total_amt = this.total;
       price = "";
       service_id = 0;
    }else{
       total_amt = "";
       price = this.price;
       service_id = form.value.service_id;
    }
    let meeting_post = new FormData();
    meeting_post.append('community_id', this.community_id); 
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('user_type', this.user_type); 
    meeting_post.append('flat_id', form.value.unit_id); 
    meeting_post.append('item_type_id', form.value.service_type); 
    meeting_post.append('on_date', form.value.date); 
    meeting_post.append('time_from', form.value.time_from); 
    meeting_post.append('time_to', form.value.time_to); 
    meeting_post.append('provider_id', form.value.provider_id); 
    meeting_post.append('total_amt', total_amt); 
    meeting_post.append('service_id', service_id); 
    meeting_post.append('price', price);  
    if(this.user_type=='4'){
      meeting_post.append('member_id', form.value.member_id);
    }  
    if(service_id == 0){
      meeting_post.append("item",  JSON.stringify(this.item_array));
    }else{
      meeting_post.append("item",  "");
    }
    
    this.authService.common('placeExternalServiceRequestForApp',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/external-request-list']);
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
  }
}
