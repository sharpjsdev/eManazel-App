import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-add-staff',
  templateUrl: './add-staff.page.html',
  styleUrls: ['./add-staff.page.scss'],
})
export class AddStaffPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  country_code: any = [];
  cities: any = [];
  departments: any = [];
  language: any;
  district_list: any;
  img1 : any = [];
  user_name: string;
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
  ionViewWillEnter() {
    this.user_type = localStorage.getItem("user_type");
    this.user_name = localStorage.getItem("user_name");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");    
    this.authService.common('getCity',"").subscribe((res) => {
      if(res['success']=='1'){
        this.cities = res['data'];
      }
    })
    this.authService.common('getCountryCodes',"").subscribe((res) => {
      if(res['success']=='1'){
        this.country_code = res['data'];
      }
      this.checkNotification();
    })
    let dept = new FormData();
    dept.append('community_id', this.community_id);
    dept.append('user_id', this.user_id);
    dept.append('user_type', this.user_type);
    this.authService.common('getDepartments',dept).subscribe((res) => {
      if(res['success']=='1'){
        this.departments = res['data'];
        console.log(this.departments);
      }
    })
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
  getDistrict(ev){
    var city_id = ev.target.value;
    if(city_id!=''){
      let city_post = new FormData();
      city_post.append('city_id', city_id);
      this.authService.common('getArea',city_post).subscribe((res) => {
        if(res['success']=='1'){
          this.district_list = res['data'];
        }
      })
    }
  }
  userForm(form){
    this.ionLoader.showLoader();
    var imge;
    var img_text = $('input[type=file]')[0].files[0];
    if(img_text == undefined){
      imge = "";
    }else{
      imge = $('input[type=file]')[0].files[0];
    }
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('name', form.value.name);        
    meeting_post.append('staff_type', form.value.usertype);        
    meeting_post.append('email', form.value.email);        
    meeting_post.append('country_code', form.value.code);   
    meeting_post.append('mobile', form.value.mobile);   
    meeting_post.append('department_id', form.value.depart);   
    meeting_post.append('password', form.value.password);   
    meeting_post.append('confirm_password', form.value.c_password);   
    meeting_post.append('city', form.value.city); 
    meeting_post.append('area', form.value.district); 
    meeting_post.append('address', form.value.address); 
    meeting_post.append('image',imge);      
    this.authService.common('addStaff',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/staffs']); 
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
  }
}
