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
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.page.html',
  styleUrls: ['./invoice-create.page.scss'],
})
export class InvoiceCreatePage implements OnInit {
  annualYear: any = [];
  app_url: string;
  user_type: string;
  user_id: string;
  community_id: string;
  language: string;
  community_area_unit: string;
  community_area: string;
  current_year: any;
  notification_count: any;
  constructor(
    private toastService: ToastService,
    private router: Router,
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
    var d = new Date();
    this.current_year = d.getFullYear();
    this.ionLoader.showLoader();
    this.app_url = this.authService.appUrl(); 
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.community_area_unit = localStorage.getItem("community_area_unit");
    this.community_area = localStorage.getItem("community_area");
    this.language = localStorage.getItem("language");
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('year', this.current_year);
    this.authService.common('getAnnualOnYearNew',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.annualYear = res['data']; 
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
calculatePrice(){
 var balance =  parseFloat(this.annualYear.balance);
 var revenue = parseFloat(this.annualYear.revenue);
 var expence = parseFloat(this.annualYear.expence);
 var unit = parseFloat(this.community_area);
 var price_per_unit = 0.00;
 price_per_unit = (expence - balance - revenue) / unit;
 this.annualYear.price_per_unit = price_per_unit.toFixed(2);
}
saveForm(form){
  let meeting_post = new FormData();
  meeting_post.append('user_type', this.user_type);
  meeting_post.append('user_id', this.user_id); 
  meeting_post.append('community_id', this.community_id);
  meeting_post.append('year', form.value.year);
  meeting_post.append('balance', form.value.balance);
  meeting_post.append('revenue', form.value.revenue);
  meeting_post.append('expence', form.value.expenses);
  meeting_post.append('unit', form.value.area);
  meeting_post.append('area_unit', form.value.a_unit);
  meeting_post.append('price_per_unit', form.value.price_per_unit);
  this.authService.common('addUpdateInvoice',meeting_post).subscribe((res) => {
    if(res['success']=='1'){
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
      this.router.navigate(['account']);
    }else{
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
    }
  })
}
}
