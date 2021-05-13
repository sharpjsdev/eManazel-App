import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { PopoverController , NavController , Platform } from '@ionic/angular';
import { SettingPage } from '../popover/setting/setting.page';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService } from '../services/event.service';
declare var $: any;
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  items: any = [];
  language: any;
  item_type: any = [];
  item_type_service: any;
  item_name: any = [];
  price: any;
  unit: any;
  rating: any;
  service: any = [];
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
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id); 
    this.authService.common('getDetailsAboutItem',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.items = res['data'];  
        this.item_type = res['data'].type;  
        this.item_type_service = res['data'].item_type;  
        console.log(this.item_type_service);
      }
    })
    this.checkNotification();
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
  // selectType(ev){
  //   var service_type_id = ev.target.value;
  //   if(service_type_id != ""){
  //     let meeting_post = new FormData();
  //     meeting_post.append('user_type', this.user_type);
  //     meeting_post.append('user_id', this.user_id); 
  //     meeting_post.append('community_id', this.community_id);
  //     meeting_post.append('service_type_id', service_type_id);      
  //     if(this.item_type.id == 2){
  //       this.authService.common('getServiceProviderItemByTypeId',meeting_post).subscribe((res) => {
  //         if(res['success']=='1'){
  //           this.item_name = res['data'];
  //           console.log(this.item_name);
            
  //         }else{
  //           this.item_name =[];
  //         }
  //       })
  //     }else{
  //       this.authService.common('getServiceProviderServiceByTypeId',meeting_post).subscribe((res) => {
  //         if(res['success']=='1'){
  //           this.service = res['data'];
  //           console.log(this.service);
            
  //         }else{
  //           this.service =[];
  //         }
  //       })
  //     }
    
  // }
  // }

  selectType(ev){
    var service_type_id = ev.target.value;
    if(service_type_id != ""){
      let meeting_post = new FormData();
      meeting_post.append('user_type', this.user_type);
      meeting_post.append('user_id', this.user_id); 
      meeting_post.append('community_id', this.community_id);
      meeting_post.append('service_type_id', service_type_id);      
      if(this.item_type.id != 2){
        this.authService.common('getServiceProviderServiceByTypeId',meeting_post).subscribe((res) => {
          if(res['success']=='1'){
            this.service = res['data'];
            console.log(this.service);
            
          }else{
            this.service =[];
          }
        })
      }
    
  }
  }

  selectItemPrice(ev){
    var item_id = ev.target.value;
    if(item_id!=''){
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('item_id', item_id);
    this.authService.common('getServiceProviderItemPriceByItemId',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.price = res['data'].price;
        this.unit = res['data'].unit;
        this.rating = res['data'].rating;
        
      }else{
        this.price = "";
        this.unit = "";
        this.rating = "";
      }
    })
  }
}
save(form){
  var img;
  var img_text = $('input[type=file]')[0].files[0];
  if(img_text == undefined){
    img = "";
  }else{
    img = $('input[type=file]')[0].files[0];
  }
  this.ionLoader.showLoader();
  let add_post = new FormData();
  add_post.append('user_type', this.user_type);
  add_post.append('user_id', this.user_id); 
  add_post.append('community_id', this.community_id);
  add_post.append('type_id', this.item_type.id);
  add_post.append('item', form.value.item_namee);
  add_post.append('item_id', form.value.item_id);
  add_post.append('price', form.value.price);
  add_post.append('unit', form.value.unit);
  add_post.append('rating', form.value.rating);
  add_post.append('service', form.value.service_name);
  add_post.append("item_image",  img);
  this.authService.common('addItem',add_post).subscribe((res) => {
    if(res['success']=='1'){
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
      this.router.navigate(['/item-list'])    ; 
    }else{
      this.ionLoader.hideLoader();
      this.toastService.presentToast(res['message']);
    }
  })
}
}
