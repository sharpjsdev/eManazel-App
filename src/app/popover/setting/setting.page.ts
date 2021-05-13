import { Component, OnInit } from '@angular/core';
import { PopoverController, } from '@ionic/angular';
import { AlertService } from '../../services/alert.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { Router} from '@angular/router';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(
    private popoverController: PopoverController,
    private alrtService: AlertService,
    private authService: AuthService,
    private toastService: ToastService,
    private router : Router,
    private _translate: TranslateService,
  ) { }

  ngOnInit() {
  }
  wifiSetting() {
    // code for setting wifi option in apps
    this.popoverController.dismiss();
  }

  joinCommunity() {
    // code for logout
    this.popoverController.dismiss();
    this.router.navigate(['/join-community']);
  }

  eventFromPopover() {
    this.popoverController.dismiss('edupala.com');
  }
  leaveCommunity(){
    this.popoverController.dismiss();
    this.alrtService.presentConfirm(this._translate.instant('PopUp.alert_label'),this._translate.instant('PopUp.leave_community_label'),this._translate.instant('Common.no_label'),this._translate.instant('Common.yes_label')).then(res => {
      if(res=='ok'){
        let flat_post = new FormData();
        flat_post.append('user_type', localStorage.getItem("user_type"));
        flat_post.append('user_id', localStorage.getItem("user_id")); 
        flat_post.append('community_id', localStorage.getItem("community_id")); 
        this.authService.common('leaveCommunity',flat_post).subscribe((res) => {
          if(res['success']=='1'){
            this.toastService.presentToast(res['message']);
          }else{
            this.toastService.presentToast(res['message']);
          }
        })
      }
    });
  }
}
