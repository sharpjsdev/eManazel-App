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
  selector: 'app-journal-details',
  templateUrl: './journal-details.page.html',
  styleUrls: ['./journal-details.page.scss'],
})
export class JournalDetailsPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  journal_detail: any = [];
  language: any;
  journal_id: any;
  appUrl: string;
  journal_images: any = [];
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private ionLoader: LoaderService,
    private platform : Platform,
    private popoverController: PopoverController,
    private translateConfigService: TranslateConfigService,
    private event : EventService
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter(): void {
    this.journal_id =this.route.snapshot.params['id'];  
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
    meeting_post.append('journal_id', this.journal_id);
    this.authService.common('getJournalDetailsNew',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.journal_detail = res['data']['payment_data'];
        this.journal_images = res['data']['images'];
        console.log(this.journal_images);           
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
}
