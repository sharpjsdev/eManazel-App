import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-edit-journal',
  templateUrl: './edit-journal.page.html',
  styleUrls: ['./edit-journal.page.scss'],
})
export class EditJournalPage implements OnInit {
  journal: any = [];
  app_url: string;
  user_type: string;
  user_id: string;
  community_id: string;
  language: string;
  journal_id : any;
  payment_mode: any = [];
  mode_type: any;
  myFile: any = [];
  transaction_num: any ="";
  acc_no: any="";
  receipt_num: any="";
  cheque_no: any="";
  date: string;
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private route : ActivatedRoute,
    private datePicker: DatePicker,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }
  onUploadChange(event) {
    
    this.myFile = event.target.files;
  
  }
  ngOnInit() {
  }
  ionViewWillEnter(): void {
    this.ionLoader.showLoader();
    this.journal_id =this.route.snapshot.params['id']; 
    this.app_url = this.authService.appUrl(); 
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('journal_id', this.journal_id);
    this.authService.common('getJournalDetails',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.journal = res['data']['payment_data']; 
        console.log(this.journal);
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
    this.authService.common('getPaymentMode',"").subscribe((res) => {
      if(res['success']=='1'){
        this.payment_mode = res['data']; 
        console.log(this.payment_mode);
      }else{
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
selectMode(ev){
  this.mode_type = ev.target.value;
  
}
save(form){
    this.ionLoader.showLoader();    
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('action_id', this.journal_id);
    meeting_post.append('amount', form.value.amount);        
    meeting_post.append('paid_on', form.value.date);        
    meeting_post.append('description', form.value.desc);        
    meeting_post.append('amt_type', form.value.transaction_type);   
    meeting_post.append('payment_mode', form.value.mode);  
    if(this.mode_type==1){
      this.acc_no = "";
      this.transaction_num = "";
      this.cheque_no = "";
    }if(this.mode_type==2){
      this.acc_no = "";
      this.transaction_num = "";
      this.cheque_no = form.value.cheque_no;
    }if(this.mode_type==3){
      this.acc_no = form.value.acc_no;
      this.transaction_num = form.value.transaction_number;
      this.cheque_no = "";
    }
    meeting_post.append('transaction_no', this.transaction_num);  
    meeting_post.append('account_no', this.acc_no);  
    meeting_post.append('receipt_no', form.value.re_no);  
    meeting_post.append('cheque_no', this.cheque_no);  
    meeting_post.append('vendor_name', form.value.vendor_name);  
    meeting_post.append('vendor_address', form.value.vendor_address);  
    for  (var i =  0; i <  this.myFile.length; i++)  {  
      meeting_post.append("attachment[]",  this.myFile[i]);
  } 
    this.authService.common('updateAction',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/account']); 
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
      })
  }
  showDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.date = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }
}
