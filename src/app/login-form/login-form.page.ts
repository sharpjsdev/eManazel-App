import { Component, OnInit } from '@angular/core';
import { NavController, MenuController , Platform ,ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { TranslateConfigService } from '../services/translate-config.service';
import { EventService} from '../services/event.service';
import { ForgotPasswordPage } from '../forgot-password/forgot-password.page';
import { CommunityListPage } from '../modal/community-list/community-list.page';
import { LoaderService } from '../services/loader.service';
import { FCM } from '@ionic-native/fcm/ngx';
declare var $: any;
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.page.html',
  styleUrls: ['./login-form.page.scss'],
})
export class LoginFormPage implements OnInit {
  role_check: any;
  role: string;
  version: string;
  selectedLanguage:string;
  device_token: string;
  constructor(
    private route: ActivatedRoute,
    public platform: Platform,
    public navCtrl: NavController, 
    public menuCtrl: MenuController, 
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    private translateConfigService: TranslateConfigService,
    public event : EventService,
    private ionLoader: LoaderService,
    private fcm: FCM,
    public modalController: ModalController
  ) {
    this.translateConfigService.setLanguage(localStorage.getItem('language'));
    
   }
   public type = 'password';
   public showPass = false;
   showPassword() {
      this.showPass = !this.showPass;
      if(this.showPass){
        this.type = 'text';
      } else {
        this.type = 'password';
      }
   }
  ngOnInit() {
    this.role_check =this.route.snapshot.params['id'];  
    if(this.role_check == 2){
      this.role = 'Service Provider';
    }if(this.role_check == 4){
      this.role = 'Community';
    } if(this.role_check == 5){
      this.role = 'Community Member';
    } if(this.role_check == 0){
      this.role = "Service Provider Staff";
    } if(this.role_check == -1){
      this.role = "Service Provider Manager";
    } if(this.role_check == 6){
      this.role = "Community Staff";
    } if(this.role_check == 25){
      this.role_check = 6;
      this.role = "Community Manager";
    } if(this.role_check == 1){
      this.role = "Guest";
    }
    this.platform.ready().then(() => {
      if (this.platform.is('android')) {
           this.version='a';
      } else if (this.platform.is('ios')) {
        this.version='i';
      } else {
      //fallback to browser APIs or
      console.log('The platform is not supported');
        }
        this.fcm.getToken().then(token => {
          this.device_token = token;
          //alert(this.device_token);
        },(error) => {
					console.log('error retrieving token: ' + error);
				
					});
      });
  }
  ionViewWillEnter() {
    if (localStorage.getItem("user_id") != null) {
		  this.navCtrl.navigateRoot("/dashboard");
		}
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
		this.menuCtrl.enable(true);
	}
  async forgotPassword() {
    const modal = await this.modalController.create({
      component: ForgotPasswordPage,
      cssClass: 'my-custom-modal forgot-modal',
      backdropDismiss:false
    });
    return await modal.present();
  }
  async communityList(community,login_post) {
    const modal = await this.modalController.create({
      component: CommunityListPage,
      cssClass: 'my-custom-modal forgot-modal',
      backdropDismiss:false,
      componentProps: {
        'community': community,
        'login_post' :login_post
      }
    });
    return await modal.present();
  }
  login(f){
    this.ionLoader.showLoader();
    let login_post = new FormData();
    login_post.append('email', f.value.email);
    login_post.append('password', f.value.password);
    login_post.append('devicetoken', this.device_token);
    login_post.append('deviceid', 'dsadfsads');
    login_post.append('devicetype', this.version);
    login_post.append('user_type', this.role_check);
    if(this.role_check == 4){

      var url = "communityLogin";

    }else{

      var url = "login_new";
    }
    if(this.role_check == 4){
      this.authService.login(url , login_post).subscribe((res) => {
        if(res['success']=='1'){ 
          this.ionLoader.hideLoader();
          if(res['data'].length > 1){
            console.log("hello");
            this.ionLoader.hideLoader();
            console.log(login_post);
            this.communityList(res['data'],login_post);
            
          }else{
            login_post.append('community_id', res['data']['id']);
            this.authService.common('communityLoginWitbSelectedCommunity' , login_post).subscribe((log) => {
              if(log['success'] == 1){
                this.ionLoader.hideLoader();
                this.toastService.presentToast(log['message']);
                console.log(log['data']);
                localStorage.setItem("user_id",log['data'].user_id);
                localStorage.setItem("community_id",log['data'].community_id);
                localStorage.setItem("community_name",log['data'].community_name);
                localStorage.setItem("user_email",log['data'].email);
                localStorage.setItem("user_type",log['data'].user_type);
                localStorage.setItem("user_name",log['data'].name);
                localStorage.setItem("user_image",log['data'].image);
                localStorage.setItem("user_mobile",log['data'].mobile);
                localStorage.setItem("user_country_code",log['data'].country_code);
                localStorage.setItem("community_country_code",log['data'].community_country_code);
                localStorage.setItem("community_area_unit",log['data'].unit);
                localStorage.setItem("community_area_unit_id",log['data'].area_unit_id);
                localStorage.setItem("community_area",log['data'].area);
                if(log['data'].provider_id!=undefined){
                localStorage.setItem("provider_id",log['data'].provider_id);
                }else{
                  localStorage.setItem("provider_id",'0');
                }
                if(log['data'].staff_type!=undefined){
                  localStorage.setItem("community_staff_type",log['data'].staff_type);
                  }else{
                    localStorage.setItem("community_staff_type",'none');
                  }
                if(log['data'].item_type_id!=undefined){
                  localStorage.setItem("service_type_id",log['data'].item_type_id);
                }else{
                    localStorage.setItem("service_type_id",'0');
                }
                this.event.publish('user:login', {
                });
                if(log['data'].user_type == 0){
                  if(localStorage.getItem("service_type_id") =='17'){
                    this.router.navigate(['/dashboard']);
                  }else{
                    this.router.navigate(['/external-request-list']);
                  }
                }else{
                  this.router.navigate(['/community-dashboard']);
                }
              }else{
                this.toastService.presentToast(log['message']);
              }
            })
          }
        
        }else{
          this.ionLoader.hideLoader();
          this.toastService.presentToast(res['message']);
        //this.responseMsg(res['message']);
        }
      });
    }else{
    
    this.authService.login(url , login_post).subscribe((res) => {
      if(res['success']=='1'){ 
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        console.log(res['data']);
        localStorage.setItem("user_id",res['data'].user_id);
        localStorage.setItem("community_id",res['data'].community_id);
        localStorage.setItem("community_name",res['data'].community_name);
        localStorage.setItem("user_email",res['data'].email);
        localStorage.setItem("user_type",res['data'].user_type);
        localStorage.setItem("user_name",res['data'].name);
        localStorage.setItem("user_image",res['data'].image);
        localStorage.setItem("user_mobile",res['data'].mobile);
        localStorage.setItem("user_country_code",res['data'].country_code);
        if(res['data'].provider_id!=undefined){
        localStorage.setItem("provider_id",res['data'].provider_id);
        }else{
          localStorage.setItem("provider_id",'0');
        }
        if(res['data'].staff_type!=undefined){
          localStorage.setItem("community_staff_type",res['data'].staff_type);
          }else{
            localStorage.setItem("community_staff_type",'none');
          }
        if(res['data'].item_type_id!=undefined){
          localStorage.setItem("service_type_id",res['data'].item_type_id);
        }else{
            localStorage.setItem("service_type_id",'0');
        }
        this.event.publish('user:login', {
        });
        if(res['data'].user_type == 0){
          if(localStorage.getItem("service_type_id") =='17'){
            this.router.navigate(['/dashboard']);
          }else{
            this.router.navigate(['/external-request-list']);
          }
        }else{
          this.router.navigate(['/dashboard']);
        }
        
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      //this.responseMsg(res['message']);
      }
    });
  }
  }
}
