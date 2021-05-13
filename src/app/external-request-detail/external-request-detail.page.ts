import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ModalController , ActionSheetController  } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ChangeRequestStatusPage } from '../modal/change-request-status/change-request-status.page';
import { CompleteJobPage } from '../modal/complete-job/complete-job.page';
import { AssignStaffPage } from '../modal/assign-staff/assign-staff.page';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-external-request-detail',
  templateUrl: './external-request-detail.page.html',
  styleUrls: ['./external-request-detail.page.scss'],
})
export class ExternalRequestDetailPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  request: any = [];
  language: any;
  external_id: any;
  appUrl: string;
  before_work_image: any = "";
  after_work_image: any = "";
  order_request: any = [];
  croppedImagepath = "";
  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  cropOptions: CropOptions = {
    quality: 50
  }
  arg_type: any;
  notification_count: any;
  
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private ionLoader: LoaderService,
    public modalController: ModalController,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private crop: Crop,
    private transfer: FileTransfer,
    private route:ActivatedRoute,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
    console.log(this.before_work_image);
  }
  async selectImage(arg) {
    this.arg_type = arg;
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }
 
  pickImage(sourceType ) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
        //alert(imageData);
      if(sourceType == 0){
         let imageData_file = 'file://'+imageData;
         this.cropImage(imageData);
      }else{
         this.cropImage(imageData);
      }

    }, (err) => {
      // Handle error
    });
  }
  cropImage(fileUrl) {
    //alert(fileUrl);
    this.crop.crop(fileUrl, { quality: 50 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }
  showCroppedImage(ImagePath) {
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.croppedImagepath = base64;
      //alert(this.croppedImagepath)
       var self = this;
      if(self.arg_type == 'before'){
        self.uploadBeforeImage(self.croppedImagepath);
      }else if(self.arg_type == 'after'){
        self.uploadAfterImage(self.croppedImagepath);
      }
      
    }, error => {
      alert('Error in showing image' + error);
    });
  }
  async changeStatus() {
    const modal = await this.modalController.create({
      component: ChangeRequestStatusPage,
      cssClass: 'my-custom-modal forgot-modal',
      backdropDismiss:false,
      componentProps: {
        'req_data': this.external_id
      }
    });
    return await modal.present();
  }
  async assignStaff(pro_id) {
    const modal = await this.modalController.create({
      component: AssignStaffPage,
      cssClass: 'my-custom-modal forgot-modal',
      backdropDismiss:false,
      componentProps: {
        'req_data': this.external_id,
        'provider_id' : pro_id

      }
    });
    return await modal.present();
  }
  async changeJobStatus() {
    const modal = await this.modalController.create({
      component: CompleteJobPage,
      cssClass: 'my-custom-modal forgot-modal',
      backdropDismiss:false,
      componentProps: {
        'req_data': this.external_id
      }
    });
    return await modal.present();
  }
  
  ionViewWillEnter(): void {
    this.external_id =this.route.snapshot.params['id'];  
    this.user_type = localStorage.getItem("user_type");
    this.appUrl = this.authService.appUrl();
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('service_req_id', this.external_id);
    this.authService.common('getExternalRequestById',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.request = res['data'];
        //console.log(this.request);
          
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
    this.authService.common('getExternalRequestOrderById',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.order_request = res['data']; 
        //console.log(this.order_request);   
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
  uploadBeforeImage(var1){
   //alert()
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('request_id', this.external_id);
    meeting_post.append('before_img',var1);
    this.authService.common('staffExternalServiceUploadBeforeImgForApp',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.before_work_image = res['data'];   
        this.toastService.presentToast(res['message']);       
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })

  }
  uploadAfterImage(img){
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('request_id', this.external_id);
    meeting_post.append('after_img',img);
    this.authService.common('staffExternalServiceUploadAfterImgForApp',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.after_work_image = res['data'];   
        this.toastService.presentToast(res['message']);       
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
  }
}
