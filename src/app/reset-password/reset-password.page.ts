import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

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
  ngOnInit() {
  }
  resetForm(form){
    this.ionLoader.showLoader();
    let meeting_post = new FormData();
    meeting_post.append('code', form.value.code);
    meeting_post.append('password', form.value.password);
    meeting_post.append('confirm_password', form.value.c_pass);
    this.authService.common('setNewPassword',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.closeModal();
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
      }else{
        //this.closeModal();
         this.ionLoader.hideLoader();
         this.toastService.presentToast(res['message']);
      }
    })
  }
}
