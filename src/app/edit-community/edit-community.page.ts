import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { TranslateConfigService } from '../services/translate-config.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-edit-community',
  templateUrl: './edit-community.page.html',
  styleUrls: ['./edit-community.page.scss'],
})
export class EditCommunityPage implements OnInit {
  community:any = {};
  user_type: string;
  user_id: string;
  community_id: string;
  code: any;
  city: any;
  area_units: any;
  dis_area: any;
  myFile: any = [];
  notification_count: any;
  language: string;
  constructor(
    private translateConfigService: TranslateConfigService,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private platform : Platform,
    private popoverController: PopoverController,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void {
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem('language');
    this.ionLoader.showLoader();
    let community_post = new FormData();
    community_post.append('user_type', this.user_type);
    community_post.append('user_id', this.user_id);
    community_post.append('community_id', this.community_id);          
    this.authService.common('getCommunityDetails', community_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.community = res['data'];
        //console.log(this.community);
      
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
      this.authService.common('getCountryCodes', "").subscribe((res) => {
        if(res['success']=='1'){
          this.code = res['data'];
        }
      })
      this.authService.common('getCity', "").subscribe((res) => {
        if(res['success']=='1'){
          this.city = res['data'];
         // console.log(this.city)
        }
      })
      this.authService.common('getunits', community_post).subscribe((res) => {
        if(res['success']=='1'){
          this.area_units = res['data'];
         // console.log(this.area_units)
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
  onUploadChange(event) {
    this.myFile = event.target.files;
  
  }
  communityForm(form){
    //this.ionLoader.showLoader();
    let community_post = new FormData();
    community_post.append('user_type', this.user_type);
    community_post.append('user_id', this.user_id);
    community_post.append('community_id', this.community_id); 
    community_post.append('name', form.value.c_name); 
    community_post.append('short_name', form.value.short_name); 
    community_post.append('country_code', form.value.std_code); 
    community_post.append('contact', form.value.mobile); 
    community_post.append('city_id', form.value.city); 
    community_post.append('area_id', form.value.district); 
    community_post.append('location', form.value.address); 
    community_post.append('pincode', form.value.zip_code); 
    community_post.append('total_area', form.value.area); 
    community_post.append('area_unit', form.value.area_unit); 
    for  (var i =  0; i <  this.myFile.length; i++)  {  
      community_post.append("images[]",  this.myFile[i]);
    } 
    this.authService.common('updateCommunity', community_post).subscribe((res) => {
      if(res['success']=='1'){
        //this.ionLoader.hideLoader();
        this.router.navigate(['/community-details']);
      
      }else{
        //this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
  }
  selectDistrict(ev){
    var city_id = ev.target.value;
    if(city_id!=''){
      let community_post = new FormData();
      community_post.append('city_id', city_id); 
      this.authService.common('getArea', community_post).subscribe((res) => {
        if(res['success']=='1'){
          this.dis_area = res['data'];
          //console.log(this.dis_area)
        }
      })
    }
  }
}
