import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.page.html',
  styleUrls: ['./edit-vehicle.page.scss'],
})
export class EditVehiclePage implements OnInit {
  user_type: string;
  community_id: string;
  user_id: string;
  flats: any;
  visitor_type: any;
  vehicle: any = {};
  vehicle_id: any;
  vehicle_no: any;
  v1: any;
  v2: any;
  v3: any;
  members: any;
  zone: any;
  notification_count: any;
  language: string;
  constructor(
    private authService : AuthService,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    private router: Router,
    private route : ActivatedRoute,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.ionLoader.showLoader();
    this.vehicle_id =this.route.snapshot.params['id'];
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem('language');
    let flat_post = new FormData();
    flat_post.append('user_type', this.user_type);
    flat_post.append('user_id', this.user_id); 
    flat_post.append('community_id', this.community_id);
    let vehicle_post = new FormData();
    vehicle_post.append('user_type', this.user_type);
    vehicle_post.append('user_id', this.user_id); 
    vehicle_post.append('community_id', this.community_id);
    vehicle_post.append('vehicle_id', this.vehicle_id);
    if(this.user_type=='4'){
      var url="getVehicleById";
      this.authService.common('getGroup',flat_post).subscribe((res) => {
        if(res['success']=='1'){
          this.zone = res['data']; 
        }
      })
    }else{
      var url ="getUserVehicleById";
      this.authService.common('getMemberFlats',flat_post).subscribe((res) => {
        if(res['success']=='1'){
          this.flats = res['data'];
        }
      })
    }
    
    this.authService.common('getVehicleType',flat_post).subscribe((res1) => {
      if(res1['success']=='1'){
        this.visitor_type = res1['data'];
      }
      })
    this.authService.common(url,vehicle_post).subscribe((res2) => {
      if(res2['success']=='1'){
        this.ionLoader.hideLoader();
        this.vehicle = res2['data'];
        console.log(this.vehicle);
        var ress = this.vehicle.number.split("-");
        this.vehicle_no = ress[0];
        this.v1= ress[1].substring(0,1);
        this.v2= ress[1].substring(1,2);
        this.v3= ress[1].substring(2,3);
        
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res2['message']);
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
  visitorForm(form){
    this.ionLoader.showLoader();
    var vehicle = "";
    var v1N  =  form.value.vehicle1N;
    var v1L1 = form.value.vehicle1L1;
    var v1L2 = form.value.vehicle1L2;
    var v1L3 = form.value.vehicle1L3;
    vehicle = v1N + '-' + v1L1 + v1L2 + v1L3;
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('flat_id', form.value.unit)        
    meeting_post.append('type_id', form.value.v_type);
    meeting_post.append('number',vehicle); 
    meeting_post.append('vehicle_id',this.vehicle_id); 
    if(this.user_type=='4'){
      var url ="updateUserVehicle";
      meeting_post.append('member_id', form.value.member_id); 
    }else{
      var url = "updateVehicle";
    }
    this.authService.common(url,meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        if(this.user_type=='4'){
          this.router.navigate(['/vehicle-list']); 
        }else{
          this.router.navigate(['/my-details']); 
        }
        
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
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
}
