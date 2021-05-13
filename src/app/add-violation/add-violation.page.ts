import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController  } from '@ionic/angular';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-add-violation',
  templateUrl: './add-violation.page.html',
  styleUrls: ['./add-violation.page.scss'],
})
export class AddViolationPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  language: any;
  units: any = [];
  category: any = [];
  type: any = [];
  members: any;
  complaint: any;
  price: any;
  wave: string;
  img1 : any = [];
  zone: any;
  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  uriPath:string;
  filesPath :string;
  filesName:string ='';
  loadfile:boolean = false;
  appUrl: string;
  Fileurl: string;
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
    private file: File,
    private transfer: FileTransfer,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private ionLoader: LoaderService,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void {
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    this.appUrl = this.authService.webUrl();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id); 
    if(this.user_type != '5'){
      this.authService.common('getGroup',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.zone = res['data']; 
        }
      })
    }else{
      this.authService.common('getMemberFlats',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.units = res['data'];  
        }
      })
    }
    this.authService.common('getViolationCategories',meeting_post).subscribe((res1) => {
      if(res1['success']=='1'){
        this.category = res1['data']; 
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
          this.units = res['data'];
        }
      })
    }
  }
  getMemeberFromFlat(ev){
    var flat_id = ev.target.value;
    if(this.user_type != '5'){
      if(flat_id!=''){
        let flat_post = new FormData();
        flat_post.append('user_type', this.user_type);
        flat_post.append('user_id', this.user_id); 
        flat_post.append('community_id', this.community_id);
        flat_post.append('flat_id', flat_id);
        this.authService.common('getFlatMembers',flat_post).subscribe((res) => {
          if(res['success']=='1'){
            this.members = res['data'];
          }
        })
      }
    }
  }
  getViolationComplaint(ev){
    var member_id = ev.target.value;
    if(member_id!=''){
      let meeting_post = new FormData();
      meeting_post.append('user_type', this.user_type);
      meeting_post.append('user_id', member_id); 
      meeting_post.append('member_id', member_id); 
      meeting_post.append('community_id', this.community_id);
      this.authService.common('getViolationComplaints',meeting_post).subscribe((res1) => {
        if(res1['success']=='1'){
          this.complaint = res1['data']; 
          console.log(this.complaint);
        }
      })
  }
  }

  getViolationType(ev){
    var category_id = ev.target.value;
    if(category_id!=''){
      let meeting_post = new FormData();
      meeting_post.append('user_type', this.user_type);
      meeting_post.append('user_id', this.user_id); 
      meeting_post.append('community_id', this.community_id);
      meeting_post.append('category_id', category_id);
      this.authService.common('getViolationTypes',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.type = res['data']; 
          console.log(this.type);
        }
      })
    }
  }
  getViolationTypePrice(ev){
    var type_id = ev.target.value;
    if(type_id!=''){
      let meeting_post = new FormData();
      meeting_post.append('user_type', this.user_type);
      meeting_post.append('user_id', this.user_id); 
      meeting_post.append('community_id', this.community_id);
      meeting_post.append('type_id', type_id);
      this.authService.common('getPriceOfViolationType',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.price = res['data']['fine_amt']; 
          this.wave = 'yes'; 
          console.log(this.price);
        }
      })
    }
  }
  // onUploadChange(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     let reader = new FileReader();
  //     reader.onload = (event:any) => {
  //       this.img1 = event.target.result;
  //     }
  //     reader.readAsDataURL(event.target.files[0]);  // to trigger onload
  //   }
    
  //   let fileList: FileList = event.target.files;  
  //   let file: File = fileList[0];
  
  // }

  save(form){
     this.ionLoader.showLoader();
    // var imge;
    // var img_text = $('input[type=file]')[0].files[0];
    // if(img_text == undefined){
    //   imge = "";
    // }else{
    //   imge = $('input[type=file]')[0].files[0];
    // }
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('member_id', form.value.member_id);
    meeting_post.append('flat_id', form.value.unit_id);
    meeting_post.append('violation_id', form.value.type_id);
    meeting_post.append('complaint_id', form.value.complaint_id);
    meeting_post.append('waived', form.value.wave);
    meeting_post.append('location', form.value.address);
    meeting_post.append('notes', form.value.notes);
    //let cust_data = JSON.stringify({"user_type" : this.user_type , "user_id" : this.user_id , "community_id" : this.community_id , "member_id" : form.value.member_id , "flat_id" : form.value.unit_id , "violation_id" : form.value.type_id , "complaint_id" : form.value.complaint_id , "waived" : form.value.wave , "location" : form.value.address , "notes" : form.value.notes});

    //meeting_post.append('image', imge);
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName: this.filesName,
      chunkedMode: false,
     // mimeType: "image/jpeg",
      headers: {},
      httpMethod: 'post',
      params : {"user_type" : this.user_type , 
      "user_id" : this.user_id , 
      "community_id" : this.community_id , 
      "member_id" : form.value.member_id , 
      "flat_id" : form.value.unit_id , 
      "violation_id" : form.value.type_id , 
      "complaint_id" : form.value.complaint_id , 
      "waived" : form.value.wave , 
      "location" : form.value.address , 
      "notes" : form.value.notes
    }
    }
    //alert('2');
    if(this.filesName == ""){
      this.authService.common('addCitation',meeting_post).subscribe((res) => {
          if(res['success']=='1'){
            this.ionLoader.hideLoader();
            this.toastService.presentToast(res['message']);
            this.router.navigate(['violation-list']);
          }else{
            this.ionLoader.hideLoader();
            this.toastService.presentToast(res['message']);
          }
        })
    }else{
      fileTransfer.upload(this.Fileurl, encodeURI(this.appUrl + 'addCitation/'), options).then((data) => {  
        var success = (JSON.parse(data.response));
        if(success['success']=='1'){
          this.ionLoader.hideLoader();
          this.toastService.presentToast(success['message']);
          this.router.navigate(['violation-list']);
        }else{
          this.ionLoader.hideLoader();
          this.toastService.presentToast(success['message']);
        }
        
       }, (err) => {
        this.ionLoader.hideLoader();
        alert("error"+JSON.stringify(err));
       });
    }
    
    // this.authService.common('addCitation',meeting_post).subscribe((res) => {
    //   if(res['success']=='1'){
    //     this.ionLoader.hideLoader();
    //     this.toastService.presentToast(res['message']);
    //     this.router.navigate(['violation-list']);
    //   }else{
    //     this.ionLoader.hideLoader();
    //     this.toastService.presentToast(res['message']);
    //   }
    // })
  }
  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.choosefile();
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
  choosefile(){
    this.fileChooser.open().then(uri => {
      this.Fileurl = uri;
      this.filePath.resolveNativePath(uri).then(url => {
          /// url is path of selected file
          var fileName = url.substring(url.lastIndexOf("/") + 1);
          this.filesName = fileName;
          this.loadfile = true;
        })
        .catch(err => console.log(err));
    }
  )
  .catch(error => {
    console.log(error)
  });

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
      this.Fileurl = imageData;
      this.filesName = this.Fileurl.substring(this.Fileurl.lastIndexOf("/") + 1);
      //alert("image : "+this.filesName);
      // if(sourceType == 0){
      //    let imageData_file = 'file://'+imageData;
      //    alert(imageData_file);
      // }else{
      //   alert(imageData);
      // }

    }, (err) => {
      // Handle error
    });
  }
  
}
