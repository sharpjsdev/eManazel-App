import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { InAppBrowser , InAppBrowserOptions  } from '@ionic-native/in-app-browser/ngx';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-residents-bill',
  templateUrl: './residents-bill.page.html',
  styleUrls: ['./residents-bill.page.scss'],
})
export class ResidentsBillPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  residents_bill: any = [];
  invoice_id: any;
  residents_bill_amt: any = {};
  fileTransfer: FileTransferObject;
//   options : InAppBrowserOptions = {
//     location : 'yes',//Or 'no' 
//     hidden : 'no', //Or  'yes'
//     clearcache : 'yes',
//     clearsessioncache : 'yes',
//     zoom : 'yes',//Android only ,shows browser zoom controls 
//     hardwareback : 'yes',
//     mediaPlaybackRequiresUserAction : 'no',
//     shouldPauseOnSuspend : 'no', //Android only 
//     closebuttoncaption : 'Close', //iOS only
//     disallowoverscroll : 'no', //iOS only 
//     toolbar : 'yes', //iOS only 
//     enableViewportScale : 'no', //iOS only 
//     allowInlineMediaPlayback : 'no',//iOS only 
//     presentationstyle : 'pagesheet',//iOS only 
//     fullscreen : 'yes',//Windows only    
// };
  url_name: any;
  appUrl: string;
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
    private iab: InAppBrowser,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void {
    
    this.ionLoader.showLoader();
    this.invoice_id =this.route.snapshot.params['id'];  
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    this.appUrl = this.authService.appUrl();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('invoice_id', this.invoice_id);
    this.authService.common('getResidentsBill',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.residents_bill = res['data'];
        this.residents_bill_amt = res;
        console.log(this.residents_bill_amt.total_amount);  
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
  generateInvoice(invoice_id,bill_id){
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('invoice_id', invoice_id);
    meeting_post.append('bill_id', bill_id);
    meeting_post.append('language', this.language);
    this.authService.common('getInvoicePdf',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.url_name = this.appUrl+res['file_name'];
        //console.log(this.url_name)
        this.download(this.url_name);
        this.toastService.presentToast(res['message']);
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
  }
  public openWithInAppBrowser(url : string){
    // let target = "_blank";
    // this.iab.create(url,target);

    const browser = this.iab.create(url,'_self',{location:'no'}); 
}

download(url: string) {
  var title = Date.now();
  this.fileTransfer = this.transfer.create();
  this.fileTransfer
  .download(url, this.file.dataDirectory + title + ".pdf")
  .then(entry => {
  console.log("download complete: " + entry.toURL());
  this.fileOpener
  .open(entry.toURL(), "application/pdf")
  .then(() => console.log("File is opened"))
  .catch(e => console.log("Error opening file", e));
  });
  }
}
