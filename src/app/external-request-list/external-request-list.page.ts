import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ModalController } from '@ionic/angular';
import { InsertTokenPage } from '../modal/insert-token/insert-token.page';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-external-request-list',
  templateUrl: './external-request-list.page.html',
  styleUrls: ['./external-request-list.page.scss'],
})
export class ExternalRequestListPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  request: any = [];
  language: any;
  flat: any = [];
  staff_dropdown:any;
  check_back: string;
  provider_id: string;
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    public modalController: ModalController,
    private ionLoader: LoaderService,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  async InsertToken(id , type , befor_img , after_img) {
    const modal = await this.modalController.create({
      component: InsertTokenPage,
      cssClass: 'my-custom-modal forgot-modal',
      backdropDismiss:false,
      componentProps: {
        'req_id': id,
        'req_type': type,
        'before_img' : befor_img,
        'after_img' : after_img,
      }
    });
    return await modal.present();
  }
  ionViewWillLeave (){
    this.staff_dropdown="";
    this.check_back = "yes";
  }
  ionViewWillEnter(): void {   
    this.check_back = "no"; 
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    this.provider_id = localStorage.getItem("provider_id");
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('provider_id', this.provider_id);
    this.authService.common('getExternalServiceRequest',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.request = res['data']; 
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
    if(this.user_type=='5'){
      var url = "getMemberFlats";
    }else{
      var url = "getFlat";
    }
    this.authService.common(url,meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.flat = res['data']; 
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
  searchByDropdown(ev){
    if(this.check_back!='yes'){
    var status = ev
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('dropdown', status);
    meeting_post.append('provider_id', this.provider_id);
    this.authService.common('getExternalServiceRequest',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.request = res['data'];   
          
      }else{
        this.request = [];
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })  
   }
  }
}
