import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-edit-document',
  templateUrl: './edit-document.page.html',
  styleUrls: ['./edit-document.page.scss'],
})
export class EditDocumentPage implements OnInit {
  app_url: string;
  user_type: string;
  user_id: string;
  community_id: string;
  document_id: any;
  documents : any = [];
  type: any;
  notification_count: any;
  language: string;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private route : ActivatedRoute,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void {
    this.ionLoader.showLoader();
    this.document_id =this.route.snapshot.params['id']; 
    this.app_url = this.authService.appUrl(); 
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem('language');
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('document_id', this.document_id);
    this.authService.common('getDocumentDetails',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.documents = res['data']; 
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
    this.authService.common('getDocumentType',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.type = res['data']; 
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
save(form){
  var img;
  var img_text = $('input[type=file]')[0].files[0];
  if(img_text == undefined){
    img = "";
  }else{
    img = $('input[type=file]')[0].files[0];
  }
  this.ionLoader.showLoader();
  let meeting_post = new FormData();
  meeting_post.append('user_type', this.user_type);
  meeting_post.append('user_id', this.user_id); 
  meeting_post.append('community_id', this.community_id); 
  meeting_post.append('type_id', form.value.type_id); 
  meeting_post.append('title', form.value.title); 
  meeting_post.append('description', form.value.desc); 
  meeting_post.append("doc_file",  img);
  meeting_post.append("document_id",  this.document_id);
  this.authService.common('updateCommunityDocument',meeting_post).subscribe((res) => {
    if(res['success']=='1'){
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
      this.router.navigate(['/document']);
    }else{
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
    }
  })
}
}
