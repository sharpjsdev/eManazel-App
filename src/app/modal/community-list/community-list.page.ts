import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
import { EventService} from '../../services/event.service';
@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.page.html',
  styleUrls: ['./community-list.page.scss'],
})
export class CommunityListPage implements OnInit {

  community_list: any;
  login_details: any;
  language: string;
  constructor(
    private authService : AuthService,
    public navParams: NavParams,
    private router: Router,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    public event : EventService,
    public modalCtrl: ModalController
  ) { 
    console.log(navParams.get('login_post'));
  }

  ngOnInit() {
   this.community_list =  this.navParams.get('community');
   this.login_details =  this.navParams.get('login_post');
   this.language = localStorage.getItem("language");
  }
  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  communityForm(form){
    this.closeModal();
    //this.ionLoader.showLoader();
    this.login_details.append('community_id', form.value.community_id); 
    this.authService.common('communityLoginWitbSelectedCommunity' , this.login_details).subscribe((log) => {
      if(log['success'] == 1){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(log['message']);
        console.log(log['data'])
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
        this.ionLoader.hideLoader();
        this.toastService.presentToast(log['message']);
      }
    })
  }
}
