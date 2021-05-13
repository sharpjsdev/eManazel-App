import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AlertService } from '../services/alert.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { ModalController } from '@ionic/angular';
import { ChangeStaffStatusPage } from '../modal/change-staff-status/change-staff-status.page';
import { ChangeJobStatusPage } from '../modal/change-job-status/change-job-status.page';
import { ChangeMaintenanceRequestStatusPage } from '../modal/change-maintenance-request-status/change-maintenance-request-status.page';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-maintenance-detail',
  templateUrl: './maintenance-detail.page.html',
  styleUrls: ['./maintenance-detail.page.scss'],
})
export class MaintenanceDetailPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  maintenance: any = [];
  language: any;
  maintenance_id: any;
  appUrl: string;
  fileExtn: any;
  fileTransfer: FileTransferObject;
  community_staff_type: string;
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private alert: AlertService,
    private file: File,
    private fileOpener: FileOpener ,
    private transfer: FileTransfer,
    public modalController: ModalController,
    private route:ActivatedRoute,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService,
    private _translate: TranslateService
  ) { }

  ngOnInit() {
  }
  
  ionViewWillEnter(): void {
    this.maintenance_id =this.route.snapshot.params['id'];  
    this.user_type = localStorage.getItem("user_type");
    this.appUrl = this.authService.appUrl();
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    this.community_staff_type = localStorage.getItem("community_staff_type");
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('maintenance_id', this.maintenance_id);
    meeting_post.append('staff_type', this.community_staff_type);
    this.authService.common('getMaintenanceById',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.maintenance = res['data'];
        console.log(this.maintenance); 
        if(this.maintenance.image!="" && this.maintenance.image!="undefined" && this.maintenance.image!=null){
          this.fileExtn= this.maintenance.image.split('.').reverse()[0];
          console.log(this.fileExtn);
        } else{
          this.fileExtn = "";
        }   
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
  async changeStaffStatus() {
    const modal = await this.modalController.create({
      component: ChangeStaffStatusPage,
      cssClass: 'my-custom-modal forgot-modal',
      backdropDismiss:false,
      componentProps: {
        'req_data': this.maintenance_id
      }
    });
    return await modal.present();
  }
  async changeJobCompleteStatus() {
    const modal = await this.modalController.create({
      component: ChangeJobStatusPage,
      cssClass: 'my-custom-modal forgot-modal',
      backdropDismiss:false,
      componentProps: {
        'req_data': this.maintenance_id
      }
    });
    return await modal.present();
  }
  async changeRequestStatus() {
    const modal = await this.modalController.create({
      component: ChangeMaintenanceRequestStatusPage,
      cssClass: 'my-custom-modal',
      backdropDismiss:false,
      componentProps: {
        'req_data': this.maintenance_id
      }
    });
    return await modal.present();
  }
  
  download(file_name: string) {
    this.ionLoader.showLoader();
    var filename = file_name.replace(/^.*[\\\/]/, '');
    this.fileTransfer = this.transfer.create();
    this.fileTransfer
    .download(this.appUrl+file_name, this.file.dataDirectory + filename)
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

    addSOSToStaff(staff_id){
    if(staff_id!=""){
      this.alert.presentConfirm('SOS',this._translate.instant('PopUp.alert_msg'),this._translate.instant('Common.no_label'),this._translate.instant('Common.yes_label')).then(res => {
        if(res == 'ok'){
          let meeting_post = new FormData();
          meeting_post.append('community_id', this.community_id);
          meeting_post.append('user_id', this.user_id);
          meeting_post.append('request_id', this.maintenance_id);
          meeting_post.append('staff_id', staff_id);
          this.authService.common('addStaffSOS',meeting_post).subscribe((res) => {
            if(res['success']=='1'){
              this.toastService.presentToast(res['message']);
            }else{
              this.toastService.presentToast(res['message']);
            }
            })
        }
      })
    }   

    }
}
