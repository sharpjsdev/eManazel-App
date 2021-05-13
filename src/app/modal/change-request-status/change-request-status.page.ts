import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-change-request-status',
  templateUrl: './change-request-status.page.html',
  styleUrls: ['./change-request-status.page.scss'],
})
export class ChangeRequestStatusPage implements OnInit {
  user_type: string;
  community_id: string;
  user_id: string;
  language: string;
  constructor(
    private authService : AuthService,
    public navParams: NavParams,
    private router: Router,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    public modalCtrl: ModalController
  ) { 
    console.log(navParams.get('req_data'));
  }
  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  ngOnInit() {
    this.language = localStorage.getItem("language");
  }
  statusForm(form){
    this.ionLoader.showLoader();
    this.user_type = localStorage.getItem("user_type");
    this.community_id = localStorage.getItem("community_id");

    this.user_id = localStorage.getItem("user_id");
    var request_id = this.navParams.get('req_data');
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('request_id', request_id);
    meeting_post.append('status', form.value.status);
    this.authService.common('staffResponceToExternalRequest',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.closeModal();
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/external-request-list']); 
      }else{
         this.ionLoader.hideLoader();
         this.toastService.presentToast(res['message']);
      }
      })
  }
}
