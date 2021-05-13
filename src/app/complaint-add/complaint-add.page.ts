import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { Router } from '@angular/router';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-complaint-add',
  templateUrl: './complaint-add.page.html',
  styleUrls: ['./complaint-add.page.scss'],
})
export class ComplaintAddPage implements OnInit {
  user_type: string;
  community_id: string;
  user_id: string;
  flats: any;
  zone: any;
  complaint_type: any;
  img1 : any = [];
  members: any;
  notification_count: any;
  language: string;
  constructor(
    private authService : AuthService,
    private ionLoader: LoaderService,
    private toastService: ToastService,
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
          //console.log(this.zone);
        }
      })
    }else{
      this.authService.common('getMemberFlats',flat_post).subscribe((res) => {
        if(res['success']=='1'){
          this.flats = res['data'];
        }
      })
    }
    
      this.authService.common('getComplaintTopic',flat_post).subscribe((res) => {
        if(res['success']=='1'){
          this.complaint_type = res['data'];
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
  complaintForm(form){
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
    meeting_post.append('flat_id', form.value.unit);        
    meeting_post.append('complaint_info', form.value.info);        
    meeting_post.append('topic_id', form.value.com_type);  
    if(this.user_type=='4'){
      meeting_post.append('member_id',form.value.member_id); 
    }
    
    meeting_post.append('image',imge);      
    this.authService.common('addComplaint',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/complaint']); 
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
          console.log(this.flats);
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
            console.log(this.members);
          }
        })
      }
    }
  }
}

