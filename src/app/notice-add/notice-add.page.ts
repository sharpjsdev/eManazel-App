import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { AlertService } from '../services/alert.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-notice-add',
  templateUrl: './notice-add.page.html',
  styleUrls: ['./notice-add.page.scss'],
})
export class NoticeAddPage implements OnInit {
  notice: any;
  language: string;
  user_id: string;
  user_type: string;
  community_id: string;
  data: any = [];
  public isToggled: boolean;
  myFile: any = [];
  notification_count: any;

  constructor(
    private toastService: ToastService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private route : ActivatedRoute,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { 
     this.language = localStorage.getItem("language");
     this.isToggled = false;
  }

  ngOnInit() {
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
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
onUploadChange(ev) {
  this.myFile = ev.target.files;
  //let url = URL.createObjectURL(myFile);
  // console.log(myFile);
//  for (let i=0; i<this.myFile.length; i++) {
//      this.myFile.push(this.myFile[i]);
//    }

}
// private readFile(file: any) {
//   const reader = new FileReader();
//   reader.onloadend = () => {
//       this.data.push(reader.result, file.type);
//   };
//   reader.readAsArrayDataURL(file);
//   console.log(this.data);
// }

noticeForm(form){
  var is_imp;
  if(this.isToggled == true){
    is_imp = 1;
  }else{
    is_imp = 0;
  }
  console.log(this.myFile);
  this.ionLoader.showLoader();
  let add_post = new FormData();
  add_post.append('user_type', localStorage.getItem("user_type"));
  add_post.append('user_id', localStorage.getItem("user_id")); 
  add_post.append('community_id', localStorage.getItem("community_id"));
  add_post.append('subject', form.value.subject);
  add_post.append('description', form.value.desc);
  add_post.append('is_important', is_imp);
  for  (var i =  0; i <  this.myFile.length; i++)  {  
    add_post.append("images[]",  this.myFile[i]);
} 
  //add_post.append('images', this.myFile);
  this.authService.common('addNotice',add_post).subscribe((res) => {
    if(res['success']=='1'){
      console.log(res['data']);
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
      this.router.navigate(['/notice-list'])    ; 
    }else{
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
    }
  })
      
}
is_imp_change(ev){
  console.log("Toggled: "+ this.isToggled); 
  this.isToggled = ev.target.checked; 
}
}
