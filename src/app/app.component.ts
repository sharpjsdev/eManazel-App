import { Component,  AfterViewInit, OnDestroy ,OnInit , QueryList, ViewChildren } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {EventService} from './services/event.service';
import {AuthService} from './services/auth.service';
import { Router ,RouterEvent} from '@angular/router';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
import { AlertService } from './services/alert.service';
import { ToastService } from './services/toast.service';
import {Location} from '@angular/common';
import { Vibration } from '@ionic-native/vibration/ngx';
import { TranslateConfigService } from './services/translate-config.service';
import { interval , Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChildren(IonRouterOutlet) routerOutlets: QueryList < IonRouterOutlet > ;
  lastTimeBackPress = 0;
	timePeriodToExit = 2000;
  mySubscription: Subscription
  public selectedIndex = 0;
  public appPages;
  email: string;
  role: string;
  public showLogout = true;
  public icon = 'power';
  public openMenuFromRight;
  text: string;
  dir: string;
  showLevel1 = null;
  showLevel2 = null;
  toggleFromRight: string;
  submenu_list_test: string;
  side_bar_check: string;
  logout_title : any  ;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private event : EventService,
    private authService: AuthService,
    private alertService: AlertService,
    private toastService: ToastService,
    private router: Router,
    private location: Location,
    private alertController: AlertController,
    private vibration: Vibration,
    private _translate: TranslateService,
    private translateConfigService: TranslateConfigService
  ) {
    
    this.backButtonEvent();
    this.initializeApp();
    event.subscribe('directiochanged', (direction) => { 
      this.changeText();
     });
    var self = this;
    setInterval(function(){ 
      //this.vibrate();
      self.vibrate();
    }, 10000);//run this thang every 2 seconds
    // this.mySubscription= interval(20000).subscribe((x =>{
    //   this.vibrate();
    // }));
    
    this.changeText();
    this.email = localStorage.getItem('user_email');
    this.role = localStorage.getItem('user_type');
    if((localStorage.getItem('user_type'))== '5' ){
      this.getSidebar('5');
    }
    else if((localStorage.getItem('user_type'))=='2'){
      this.getSidebar('2');
      
    }else if((localStorage.getItem('user_type'))=='4'){
      
      this.getSidebar('4');
    }
    else if((localStorage.getItem('user_type'))=='0'){
      this.getSidebar('0');
    } else if((localStorage.getItem('user_type'))=='-1'){
      this.getSidebar('-1');
    }else if((localStorage.getItem('user_type'))=='6'){
      this.getSidebar('6');
    }else if((localStorage.getItem('user_type'))=='1'){
      this.getSidebar('1');
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
    this.statusBar.overlaysWebView(false);
	  this.statusBar.styleLightContent();
	  this.statusBar.backgroundColorByHexString("#02309d");
    setTimeout(() => {
      this.splashScreen.hide();
    }, 3000);
    this.authService.authState.subscribe(state => {
      if (state) {
        if((localStorage.getItem('user_type')) == '4'){
          this.router.navigate(['/community-dashboard']);
        }else{
          this.router.navigate(['/dashboard']);
        }
        
      } else {
        this.router.navigate(['/root']);
      }
    });
    });
      this.event.subscribe('user:login', (data: any) => {
      this.authService.ifLoggedIn();
      this.changeText();
      console.log('hii'+(localStorage.getItem('user_type')));
      this.email = localStorage.getItem('user_email');
      this.role = localStorage.getItem('user_type');
      this.selectedIndex = 0;    
    //this.showLogout = true;        
      if((localStorage.getItem('user_type'))== '5' ){
        this.getSidebar('5');
      }
      else if((localStorage.getItem('user_type'))=='2'){
        this.getSidebar('2');
        
      }else if((localStorage.getItem('user_type'))=='4'){
        
        this.getSidebar('4');
      }
      else if((localStorage.getItem('user_type'))=='0'){
        this.getSidebar('0');
      }else if((localStorage.getItem('user_type'))=='-1'){
        this.getSidebar('-1');
      }
      else if((localStorage.getItem('user_type'))=='6'){
        this.getSidebar('6');
      }else if((localStorage.getItem('user_type'))=='1'){
        this.getSidebar('1');
      }
    
    //console.log('Welcome', data.user, 'at', data.time);
  });
 
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
    
  }
  
  changeText(){
    
    if (localStorage.getItem("language") == "ar") {
      
      this.openMenuFromRight = "end";
      this.toggleFromRight = "start";
      this.text = "text-align:right";
      this.side_bar_check = "rtl";
      this.submenu_list_test = "submenu_list_ar";
      document.documentElement.dir = 'rtl';
      console.log(this.openMenuFromRight);
      
    }
    if (localStorage.getItem("language") == "en") {
      this.openMenuFromRight = "start";
      this.toggleFromRight = "end";
      this.text = "text-align:left";
      this.submenu_list_test = "submenu_list";
      this.side_bar_check = "ltr";
      document.documentElement.dir = 'ltr';
    }
    console.log(this.openMenuFromRight);
    if(localStorage.getItem('language')!=null){
      
      this.translateConfigService.setLanguage(localStorage.getItem('language'));
    }else{
      localStorage.setItem('language','en');
      this.translateConfigService.setLanguage(localStorage.getItem('language'));
    }
  }
  getSidebar(user_type){
    if(user_type == '5'){
      this.appPages = [
        {
          title: 'Menu.home_label',
          url: 'dashboard',
          icon: 'home'
        },
        {
          title: 'Menu.profile_label',
          url: 'profile',
          icon: 'person'
        },
        {
          title: 'Menu.community_details_label',
          url: 'community-details',
          icon: 'briefcase'
        },
        {
          title: 'Menu.communication_center_label',
          url: '',
          icon: 'briefcase',
          "submenu1": [
            {
              title: 'Menu.meetings_label',
              url: 'meeting-list',
              icon: 'desktop'
            },
            {
              title: 'Menu.notification_label',
              url: 'notice-list',
              icon: 'notifications'
            },
            {
              title: 'Menu.my_event_label',
              url: 'my-events',
              icon: 'calendar'
            }
          ]
        },
        // {
        //   title: 'Menu.meetings_label',
        //   url: 'meeting-list',
        //   icon: 'desktop'
        // },
        // {
        //   title: 'Menu.notification_label',
        //   url: 'notice-list',
        //   icon: 'notifications'
        // },
        {
          title: 'Menu.building_services_label',
          url: 'building-service',
          icon: 'business'
        },
        {
          title: 'Menu.my_details_label',
          url: '',
          icon: 'book',
          "submenu1": [
            {
              title: 'Menu.my_unit_label',
              url: 'my-details',
              icon: 'book'
            },
            {
              title: 'Menu.bank_label',
              url: 'bank',
              icon: 'card'
            },
            {
              title: 'Menu.document_label',
              url: 'document',
              icon: 'documents'
            },
            {
              title: 'Menu.change_password_label',
              url: 'change-password',
              icon: 'key'
            }
          ]
        },
        {
          title: 'Menu.emergency_contact_label',
          url: 'emergency-contact',
          icon: 'warning'
        },
        {
          title: 'Menu.my_ads_label',
          url: 'my-ads',
          icon: 'image'
        },
        // {
        //   title: 'Menu.my_event_label',
        //   url: 'my-events',
        //   icon: 'calendar'
        // },
        // {
        //   title: 'Menu.bank_label',
        //   url: 'bank',
        //   icon: 'card'
        // },
        // {
        //   title: 'Menu.document_label',
        //   url: 'document',
        //   icon: 'documents'
        // },
        
        // {
        //   title: 'About Us',
        //   url: '',
        //   icon: 'people-circle'
        // },
        // {
        //   title: 'Rate Us',
        //   url: '',
        //   icon: 'people-circle'
        // },
        // {
        //   title: 'Contact Us',
        //   url: '',
        //   icon: 'people-circle'
        // },
        // {
        //   title: 'App Share',
        //   url: '',
        //   icon: 'share'
        // },
        // {
        //   title: 'Menu.change_password_label',
        //   url: 'change-password',
        //   icon: 'key'
        // }
      ];
    }else if(user_type == '4'){
      this.appPages = [
        {
          title: 'Menu.home_label',
          url: 'community-dashboard',
          icon: 'home'
        },
        {
          title: 'Menu.profile_label',
          url: 'profile',
          icon: 'person'
        },
        {
          title: 'Menu.community_details_label',
          url: 'community-details',
          icon: 'briefcase'
        },
        {
          title: 'Common.resident_label',
          url: '',
          icon: 'home',
          "submenu1": [
            {
              title: 'Common.resident_label',
              url: 'resident-list',
              icon: 'home'
            },
            {
              title: 'Common.group_label',
              url: 'group-list',
              icon: 'dice'
            },
            {
              title: 'Common.unit_label',
              url: 'flat-list',
              icon: 'apps'
            },
            {
              title: 'Common.parking_label',
              url: 'parking-list',
              icon: 'location'
            },
            {
              title: 'Common.vehicle_label',
              url: 'vehicle-list',
              icon: 'car-sport'
            }
          ]
        },
        {
          title: 'Menu.communication_center_label',
          url: '',
          icon: 'briefcase',
          "submenu1": [
            {
              title: 'Menu.meetings_label',
              url: 'meeting-list',
              icon: 'desktop'
            },
            {
              title: 'Menu.notification_label',
              url: 'notice-list',
              icon: 'notifications'
            },
            {
              title: 'Menu.my_event_label',
              url: 'my-events',
              icon: 'calendar'
            }
          ]
        },
        {
          title: 'Common.service_label',
          url: 'service',
          icon: 'construct'
        },
        {
          title: 'USERTYPE.service_provider',
          url: 'service-provider',
          icon: 'disc'
        },
        {
          title: 'Menu.building_services_label',
          url: 'building-service',
          icon: 'business'
        },
        {
          title : 'Common.department_label',
          url : 'department',
          icon : 'folder'
        },
        {
          title : 'Common.staff_label',
          url : 'staffs',
          icon : 'people'
        },
        {
          title: 'Menu.my_details_label',
          url: '',
          icon: 'book',
          "submenu1": [
            {
              title: 'Menu.my_unit_label',
              url: 'my-details',
              icon: 'book'
            },
            {
              title: 'Menu.bank_label',
              url: 'bank',
              icon: 'card'
            },
            {
              title: 'Menu.document_label',
              url: 'document',
              icon: 'documents'
            },
            {
              title: 'Menu.change_password_label',
              url: 'change-password',
              icon: 'key'
            }
          ]
        },
        {
          title: 'Menu.emergency_contact_label',
          url: 'emergency-contact',
          icon: 'warning'
        },
        {
          title: 'Menu.my_ads_label',
          url: 'my-ads',
          icon: 'image'
        },
        
      ];
    }else if(user_type == '0'){
      this.appPages = [
        {
          title: 'Menu.home_label',
          url: 'dashboard',
          icon: 'home'
        },
        {
          title: 'Menu.profile_label',
          url: 'profile',
          icon: 'person'
        },
        {
          title: 'Menu.change_password_label',
          url: 'change-password',
          icon: 'key'
        }
      ];
    }else if(user_type == '1'){
      this.appPages = [
        {
          title: 'Menu.home_label',
          url: 'dashboard',
          icon: 'home'
        },
        {
          title: 'Menu.profile_label',
          url: 'profile',
          icon: 'person'
        },
        {
          title: 'Menu.apply_community',
          url: 'apply-community',
          icon: 'briefcase'
        },
        {
          title: 'Menu.apply_service_provider',
          url: 'apply-service-provider',
          icon: 'disc'
        },
        {
          title: 'Menu.apply_community_member',
          url: 'apply-community-memeber',
          icon: 'person'
        },
        {
          title: 'Menu.change_password_label',
          url: 'change-password',
          icon: 'key'
        }
      ];
    }else if(user_type == '2'){
      this.appPages = [
        {
          title: 'Menu.home_label',
          url: 'dashboard',
          icon: 'home'
        },
        {
          title: 'Menu.profile_label',
          url: 'profile',
          icon: 'person'
        },
        {
          title: 'Menu.change_password_label',
          url: 'change-password',
          icon: 'key'
        }
      ];
    }else if(user_type == '-1'){
      this.appPages = [
        {
          title: 'Menu.home_label',
          url: 'dashboard',
          icon: 'home'
        },
        {
          title: 'Menu.profile_label',
          url: 'profile',
          icon: 'person'
        },
        {
          title: 'Menu.change_password_label',
          url: 'change-password',
          icon: 'key'
        }
      ];
    }else if(user_type == '6'){
      this.appPages = [
        {
          title: 'Menu.home_label',
          url: 'dashboard',
          icon: 'home'
        },
        {
          title: 'Menu.profile_label',
          url: 'profile',
          icon: 'person'
        },
        {
          title: 'Menu.change_password_label',
          url: 'change-password',
          icon: 'key'
        }
      ];
    }
}
toggleLevel1(idx) {
  if (this.isLevel1Shown(idx)) {
    this.showLevel1 = null;
  } else {
    this.showLevel1 = idx;
  }
};
vibrate(){
  if(localStorage.getItem('user_type') == '6' ){
    if(localStorage.getItem("community_staff_type") == '1'){
      let meeting_post = new FormData();
      meeting_post.append('user_type', localStorage.getItem('user_type'));
      meeting_post.append('user_id', localStorage.getItem('user_id')); 
      meeting_post.append('community_id', localStorage.getItem('community_id'));
      this.authService.common('checkSSOSNotification',meeting_post).subscribe((res1) => {
        if(res1['success']=='1'){
          this.vibration.vibrate(1000);
          this.alertService.presentAlert('SOS','Panic alert from admin','OK').then(res => {
            if(res == 'ok'){
              let meeting_post = new FormData();
              meeting_post.append('user_type', localStorage.getItem('user_type'));
              meeting_post.append('user_id', localStorage.getItem('user_id')); 
              meeting_post.append('community_id', localStorage.getItem('community_id'));
              meeting_post.append('id', res1['data']['id']);
              this.authService.common('readSSOSNotification',meeting_post).subscribe((res) => {
                if(res['success']=='1'){
                  //this.toastService.presentToast(res['message']);
                }else{
                  //this.toastService.presentToast(res['message']);
                }
                })
            }
          })
          setTimeout( () => {
            this.alertService.hideAlert();
          }, 5000);
          
        }
      })
    }else{
      let meeting_post = new FormData();
      meeting_post.append('user_type', localStorage.getItem('user_type'));
      meeting_post.append('user_id', localStorage.getItem('user_id')); 
      meeting_post.append('community_id', localStorage.getItem('community_id'));
      this.authService.common('checkSOSNotification',meeting_post).subscribe((res1) => {
        if(res1['success']=='1'){
          this.vibration.vibrate(1000);
          this.alertService.presentAlert('SOS',res1['data']['msg'],'OK').then(res => {
            if(res == 'ok'){
              let meeting_post = new FormData();
              meeting_post.append('user_type', localStorage.getItem('user_type'));
              meeting_post.append('user_id', localStorage.getItem('user_id')); 
              meeting_post.append('community_id', localStorage.getItem('community_id'));
              meeting_post.append('id', res1['data']['id']);
              this.authService.common('readSOSNotification',meeting_post).subscribe((res) => {
                if(res['success']=='1'){
                  //this.toastService.presentToast(res['message']);
                }else{
                  //this.toastService.presentToast(res['message']);
                }
                })
            }
          })
          setTimeout( () => {
            this.alertService.hideAlert();
          }, 5000);
          
        }
      })
    }
  }

  
}
// hidePopUp(){
//   this.alertService.hideAlert();
// }

toggleLevel2(idx) {
  if (this.isLevel2Shown(idx)) {
    this.showLevel1 = null;
    this.showLevel2 = null;
  } else {
    this.showLevel1 = idx;
    this.showLevel2 = idx;
  }
}
isLevel1Shown(idx) {
  return this.showLevel1 === idx;
};

isLevel2Shown(idx) {
  return this.showLevel2 === idx;
};
// logout(){
  
//   this.authService.logout();
// }
async logout() {
  let confirm = await this.alertController.create({
    header: this._translate.instant('PopUp.logout_lable'),
    message: this._translate.instant('PopUp.logout_msg_label'),
    buttons: [
      {
        text: this._translate.instant('Common.no_label'),
        handler: () => {
          console.log('No clicked');
        }
      },
      {
        text: this._translate.instant('Common.yes_label'),
        handler: () => {
          this.authService.logout();
          navigator['app'].exitApp();
        }
      }
    ]
  });
  await confirm.present();
}
backButtonEvent() {
		
  this.platform.backButton.subscribeWithPriority(0, () => {
    this.routerOutlets.forEach(async(outlet: IonRouterOutlet) => {
      if (this.router.url != '/dashboard' && this.router.url != '/community-dashboard') {
        // await this.router.navigate(['/']);
        await this.location.back();
        }
      else if (this.router.url === '/dashboard') {
        if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
          this.lastTimeBackPress = new Date().getTime();
          this.presentAlertConfirm();
          } else {
          navigator['app'].exitApp();
        }
      }else if (this.router.url === '/community-dashboard') {
        if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
          this.lastTimeBackPress = new Date().getTime();
          this.presentAlertConfirm();
          } else {
          navigator['app'].exitApp();
        }
      }
    });
  });
}

async presentAlertConfirm() {
  const alert = await this.alertController.create({
    // header: 'Confirm!',
    message: this._translate.instant('PopUp.exit_app'),
    buttons: [{
      text: this._translate.instant('Common.cancel_label'),
      role: 'cancel',
      cssClass: 'secondary',
      handler: (blah) => {}
      }, {
      text: this._translate.instant('PopUp.close_app'),
      handler: () => {
        navigator['app'].exitApp();
      }
    }]
  });
  
  await alert.present();
}
}
