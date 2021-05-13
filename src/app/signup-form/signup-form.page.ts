import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { EventService} from '../services/event.service';
import { LoaderService } from '../services/loader.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.page.html',
  styleUrls: ['./signup-form.page.scss'],
})
export class SignupFormPage implements OnInit {
  role_check: any;
  role: string;
  code: any;
  communities: any;
  item_type: any;
  constructor(
    private route: ActivatedRoute,
    private toastService: ToastService,
    private router: Router,
    private authService: AuthService,
    public event : EventService,
    public menuCtrl: MenuController, 
    private ionLoader: LoaderService
  ) { }

  ngOnInit() {
    this.role_check =this.route.snapshot.params['id'];  
    if(this.role_check == 2){
      this.role = 'Service Provider';
    }if(this.role_check == 4){
      this.role = 'Community';
    } if(this.role_check == 5){
      this.role = 'Community Member';
    }if(this.role_check == 1){
      this.role = 'Guest';
    }
  }
  ionViewWillEnter() {
    this.menuCtrl.enable(false);
    this.authService.common('getCountryCodes',"").subscribe((res) => {
      if(res['success']=='1'){
        this.code = res['data'];
      }
    })
    this.authService.common('getCommunityListApp',"").subscribe((res) => {
      if(res['success']=='1'){
        this.communities = res['data'];
      }
    })
    this.authService.common('getItemsTypeListForAll',"").subscribe((res) => {
      if(res['success']=='1'){
        this.item_type = res['data'];
        console.log(this.item_type);
      }
    })
  }
  ionViewWillLeave() {
		this.menuCtrl.enable(true);
	}

  signup(form){
    this.ionLoader.showLoader();
    let signup_post = new FormData();
    signup_post.append('user_type', this.role_check);
    signup_post.append('name', form.value.name);
    signup_post.append('email', form.value.email);
    signup_post.append('code', form.value.std_code);
    signup_post.append('mobile', form.value.mobile);
    signup_post.append('password', form.value.password);
    signup_post.append('community_id', form.value.community_id);
    signup_post.append('service_id', form.value.service_id);
    this.authService.common('registerWithApp',signup_post).subscribe((res) => {
      if(res['success']=='1'){
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/login']);
      }else{
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }
    })
  }

}
