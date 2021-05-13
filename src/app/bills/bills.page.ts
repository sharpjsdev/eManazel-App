import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { PopoverController  } from '@ionic/angular';
import { UnitListPage } from '../unit-list/unit-list.page';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-bills',
  templateUrl: './bills.page.html',
  styleUrls: ['./bills.page.scss'],
})
export class BillsPage implements OnInit {
  bills: any = {};
  app_url: string;
  user_type: string;
  user_id: string;
  community_id: string;
  section:string;
  paid_type: any = [];
  fileTransfer: FileTransferObject;
  language: string;
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private route : ActivatedRoute,
    private file: File,
    private fileOpener: FileOpener ,
    private transfer: FileTransfer,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
    this.section = "one";
  }
  ionViewWillEnter(): void {
    this.paid_type = [];
    this.ionLoader.showLoader();
    this.app_url = this.authService.appUrl(); 
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    this.route.queryParams.subscribe((res : any)=>{
      if(res.value){
        if(JSON.parse(res.value) == 1){
          this.paid_type = "";
          this.section = "four";
        }else{
          this.paid_type = JSON.parse(res.value);
        }
        
      }
      
  });
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('keyword', this.paid_type);
    this.authService.common('getBills',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.bills = res['data']; 
        console.log(this.bills);
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
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
  async unitsPopover(ev) {
    const popover = await this.popoverController.create({
      component: UnitListPage,
      cssClass: 'popover_setting',  
      componentProps: {
        keyword: ev
      },    
      translucent: false
    });

    popover.onDidDismiss().then((result) => {
      console.log(result.data);
      if(result.data){
        this.bills = result.data;
      }
      
    });

    return await popover.present();
    /** Sync event from popover component */

  }
  download(file_name: string) {
    this.ionLoader.showLoader();
    var filename = file_name.replace(/^.*[\\\/]/, '');
    this.fileTransfer = this.transfer.create();
    this.fileTransfer
    .download(this.app_url+file_name, this.file.dataDirectory + filename)
    .then(entry => {
    this.ionLoader.hideLoader();
    this.toastService.presentToast("download complete");
    let fileExtn=filename.split('.').reverse()[0];
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
}
