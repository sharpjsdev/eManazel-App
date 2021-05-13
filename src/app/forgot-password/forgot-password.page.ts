import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
import { ResetPasswordPage } from '../reset-password/reset-password.page';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  constructor(
    private authService : AuthService,
    public navParams: NavParams,
    private router: Router,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    public modalCtrl: ModalController
  ) { }
  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  async resetPassword() {
    const modal = await this.modalCtrl.create({
      component: ResetPasswordPage,
      cssClass: 'my-custom-modal reset-modal',
      backdropDismiss:false
    });
    return await modal.present();
  }
  ngOnInit() {
  }
  forgotForm(form){
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('email', form.value.email);
    this.authService.common('forgotPassword',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.closeModal();
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.resetPassword();
      }else{
        this.closeModal();
         this.ionLoader.hideLoader();
         this.toastService.presentToast(res['message']);
      }
    })
  }
}
