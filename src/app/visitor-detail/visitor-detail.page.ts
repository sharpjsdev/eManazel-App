import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { AlertService } from '../services/alert.service';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ModalController } from '@ionic/angular';
import { ReIssueVisitorPage } from '../modal/re-issue-visitor/re-issue-visitor.page';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-visitor-detail',
  templateUrl: './visitor-detail.page.html',
  styleUrls: ['./visitor-detail.page.scss'],
})
export class VisitorDetailPage implements OnInit {
  visitor: any = {};
  visitor_id: any;
  app_url: string;
  user_type: string;
  user_id: string;
  community_id: string;
  fileTransfer: FileTransferObject;
  filename: any;
  vehicle_array: any;
  appUrl: any;
  language: string;
  notification_count: any;

  constructor(
    private toastService: ToastService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private route : ActivatedRoute,
    private file: File,
    private fileOpener: FileOpener ,
    private transfer: FileTransfer,
    private socialSharing: SocialSharing,
    public modalController: ModalController,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
    this.visitor_id =this.route.snapshot.params['id']; 
    this.appUrl = this.authService.appUrl();
    this.app_url = this.authService.appUrl();
    this.app_url = this.app_url+"uploads/qrcode/" ;
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
  }
  ionViewWillEnter(): void {
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('guest_id', this.visitor_id);        
    this.authService.common('getGuestDetails',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.visitor = res['data']; 
        //console.log(this.visitor); 
        this.filename = this.visitor.qrcode.split('/').pop();
        var str = this.visitor.vehicle;
        this.vehicle_array = str.split(":");
        //console.log(this.vehicle_array);
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
      this.checkNotification();
  }
  async ReIssue() {
    const modal = await this.modalController.create({
      component: ReIssueVisitorPage,
      cssClass: 'my-custom-modal',
      backdropDismiss:false,
      componentProps: {
        'visitor_data': this.visitor
      }
    });
    return await modal.present();
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
  // download(file_name) {   
  //   //alert(file_name);
  //   var self = this;
  //   //alert(self.app_url+file_name);
  //   let url = encodeURI(self.app_url+file_name);
  //   self.fileTransfer = self.transfer.create();
  //   self.fileTransfer
  //   .download(url, self.file.dataDirectory + file_name, true)
  //   .then(entry => {
  //     alert("success");
  //     self.toastService.presentToast("download complete");   
  //   }).catch((error) => {
  //     //here logging an error. 
  //     alert("error");
  //     console.log('download failed: ' + JSON.stringify(error));
  //   });
  // }

  download(file_name: string) {
    this.ionLoader.showLoader();
    this.fileTransfer = this.transfer.create();
    this.fileTransfer
    .download(this.app_url+file_name, this.file.dataDirectory + file_name)
    .then(entry => {
    this.ionLoader.hideLoader();
    this.toastService.presentToast("download complete");
    let fileExtn=file_name.split('.').reverse()[0];
    let fileMIMEType=this.getMIMEtype(fileExtn);
         this.fileOpener.open(entry.toURL()+"", fileMIMEType)
                .then(() => console.log('File is opened'))
                .catch(e => console.log('Error openening file', e));
    });
    }
    getMIMEtype(extn){
      let ext=extn.toLowerCase();
      let MIMETypes={
        'txt' :'text/plain',
        'docx':'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'doc' : 'application/msword',
        'pdf' : 'application/pdf',
        'jpg' : 'image/jpeg',
        'bmp' : 'image/bmp',
        'png' : 'image/png',
        'xls' : 'application/vnd.ms-excel',
        'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'rtf' : 'application/rtf',
        'ppt' : 'application/vnd.ms-powerpoint',
        'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
      }
      return MIMETypes[ext];
    }
  
  share(file_name){
    this.ionLoader.showLoader();
    let url = encodeURI(this.app_url+file_name);
    this.fileTransfer = this.transfer.create();
    this.fileTransfer
    .download(this.app_url+file_name, this.file.dataDirectory + file_name)
    .then(entry => {
      //this.toastService.presentToast('download complete'+ entry.toURL());
      this.socialSharing.share("","Visitor Bar Code", entry.toURL())
    .then((entries) => {
      this.ionLoader.hideLoader();
      //this.toastService.presentToast('download complete'+ JSON.stringify(entries));
      console.log('success ' + JSON.stringify(entries));
    })
    })
    
 
  }
  
}
