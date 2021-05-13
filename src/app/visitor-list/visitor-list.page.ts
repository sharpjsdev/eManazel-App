import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ModalController } from '@ionic/angular';
import { ScanQrCodeDetailsPage } from '../modal/scan-qr-code-details/scan-qr-code-details.page';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-visitor-list',
  templateUrl: './visitor-list.page.html',
  styleUrls: ['./visitor-list.page.scss'],
})
export class VisitorListPage implements OnInit {
  language: string;
  user_type: string;
  community_id: string;
  user_id: string;
  visitor:any = [];
  appUrl: any;
  check_back: string;
  status_dropdown: string;
  community_staff_type: string;
  scanSubscription;
  isOpen = false;
  visitor_data: any;
  notification_count: any;
  constructor(
    private authService : AuthService,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    private qrScanner: QRScanner,
    public modalController: ModalController,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.check_back = "no";
    this.appUrl = this.authService.appUrl();
    this.language = localStorage.getItem('language');
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.community_staff_type = localStorage.getItem("community_staff_type");
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('keyword', '');
    this.authService.common('getAllGuestNoLimit',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.visitor = res['data'];
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
  searchByKeyword(ev){
    var keyword = ev.target.value;
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('keyword', keyword);
    this.authService.common('getAllGuestNoLimit',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.visitor = res['data'];
      }else{
        this.visitor = [];
       this.toastService.presentToast(res['message']);
      }
      })
  }
  async openDetailpage(details,qr_code) {
    const modal = await this.modalController.create({
      component: ScanQrCodeDetailsPage,
      cssClass: 'my-custom-visitor-modal',
      backdropDismiss:false,
      componentProps: {
        'details': details,
        'qr_code': qr_code,

      }
    });
    return await modal.present();
  }
  ionViewWillLeave (){
    this.status_dropdown="";
    this.check_back = "yes";
    this.hideCamera(); 
  }
  searchByDropdown(ev){
    if(this.check_back!='yes'){
      var keyword = ev;
      this.ionLoader.showLoader();
      let meeting_post = new FormData();
      meeting_post.append('user_type', this.user_type);
      meeting_post.append('user_id', this.user_id); 
      meeting_post.append('community_id', this.community_id);
      meeting_post.append('dropdown', keyword);
      this.authService.common('getAllGuestNoLimit',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.visitor = res['data'];
      }else{
        this.ionLoader.hideLoader();
        this.visitor = [];
        this.toastService.presentToast(res['message']);
      }
      })
  }
}
scanQr(){
  //alert();
          // let meeting_post = new FormData();
          //   meeting_post.append('user_type', this.user_type);
          //   meeting_post.append('user_id', this.user_id); 
          //   meeting_post.append('community_id', this.community_id);
          //   meeting_post.append('qr_code', '52143-60-1616656683');
          //   this.authService.common('getGuestDetailsByQrCode',meeting_post).subscribe((res) => {
          //   if(res['success']=='1'){
          //     this.visitor_data = res['data'];
          //     this.openDetailpage(this.visitor_data,'52143-60-1616656683');
          //   }else{
          //   this.toastService.presentToast(res['message']);
          //   }
          // });
  (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  
  this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      //alert('1');
      if (status.authorized) {
        this.isOpen = true;
        this.qrScanner.show();
        this.scanSubscription = this.qrScanner.scan().subscribe((text:string) => {
          let meeting_post = new FormData();
            meeting_post.append('user_type', this.user_type);
            meeting_post.append('user_id', this.user_id); 
            meeting_post.append('community_id', this.community_id);
            meeting_post.append('qr_code', text);
            this.authService.common('getGuestDetailsByQrCode',meeting_post).subscribe((res) => {
              if(res['success']=='1'){
                this.visitor_data = res['data'];
                this.openDetailpage(this.visitor_data,text);
              }else{
              this.toastService.presentToast(res['message']);
              }
            })
          this.toastService.presentToast(text);
          this.isOpen = false;
        });
      } else {
        console.error('Permission Denied', status);
      }
    })
    .catch((e: any) => {
      console.error('Error', e);
    });
}
showCamera() {
  (window.document.querySelector('ion-app') as 
HTMLElement).classList.add('cameraView');
}

hideCamera() {
  (window.document.querySelector('ion-app') as 
HTMLElement).classList.remove('cameraView');
}
}
