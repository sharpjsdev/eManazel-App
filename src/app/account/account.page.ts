import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  ledger: any = [];
  journal: any = [];
  annualYear: any = [];
  app_url: string;
  user_type: string;
  user_id: string;
  community_id: string;
  section:string;
  language: string;
  journal_section: number;
  date: Date;
  current_year: any;
  notification_count: any;
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
    this.section = "one";
  }

  ionViewWillEnter(): void {
    //this.ionLoader.showLoader();
    this.date = new Date();
    this.current_year = this.date.getFullYear();
    this.app_url = this.authService.appUrl(); 
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    this.getLedger();
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
changeSegment(ev){
  var seg = ev.target.value;
  if(seg == 'two'){
    this.journal_section = 0;
    this.getJournal(0);
  }else if(seg == 'three'){
    this.getAnnualYear();
  }else{
    this.getLedger();
  }
}

getLedger(){
  this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('start', "");
    this.authService.common('getLedgers',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.ledger = res['data']; 
        //console.log(this.ledger);
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
}

getJournal(type){
  this.ionLoader.showLoader();
  let meeting_post = new FormData();
  meeting_post.append('user_type', this.user_type);
  meeting_post.append('user_id', this.user_id); 
  meeting_post.append('community_id', this.community_id);
  meeting_post.append('year', this.current_year);
  meeting_post.append('p_type', type);
  this.authService.common('getJournalLikeWeb',meeting_post).subscribe((res) => {
    if(res['success']=='1'){
      this.ionLoader.hideLoader();
      this.journal = res['data']; 
    }else{
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
      this.journal = []; 
    }
  })
}
getAnnualYear(){
  this.ionLoader.showLoader();
  let meeting_post = new FormData();
  meeting_post.append('user_type', this.user_type);
  meeting_post.append('user_id', this.user_id); 
  meeting_post.append('community_id', this.community_id);
  this.authService.common('getAnnualCostUnitArea',meeting_post).subscribe((res) => {
    if(res['success']=='1'){
      this.ionLoader.hideLoader();
      this.annualYear = res['data']; 
      console.log(this.annualYear);
    }else{
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
    }
  })
}
sendBill(invoice_id){
  this.ionLoader.showLoader();
  let meeting_post = new FormData();
  meeting_post.append('user_type', this.user_type);
  meeting_post.append('user_id', this.user_id); 
  meeting_post.append('community_id', this.community_id);
  meeting_post.append('invoice_id', invoice_id);
  meeting_post.append('language', this.language);
  this.authService.common('sendMail',meeting_post).subscribe((res) => {
    if(res['success']=='1'){
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
    }else{
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
    }
  })
}
generateBill(invoice_id){
  this.ionLoader.showLoader();
  let meeting_post = new FormData();
  meeting_post.append('user_type', this.user_type);
  meeting_post.append('user_id', this.user_id); 
  meeting_post.append('community_id', this.community_id);
  meeting_post.append('invoice_id', invoice_id);
  this.authService.common('generateBills',meeting_post).subscribe((res) => {
    if(res['success']=='1'){
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
      this.getAnnualYear();
    }else{
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
    }
  })
}
changeJournalSegment(ev){
  var p_type = ev.target.value;
  this.getJournal(p_type);
}
}
