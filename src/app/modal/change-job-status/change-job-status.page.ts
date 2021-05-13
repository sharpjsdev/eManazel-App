import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-change-job-status',
  templateUrl: './change-job-status.page.html',
  styleUrls: ['./change-job-status.page.scss'],
})
export class ChangeJobStatusPage implements OnInit {
  user_type: string;
  community_id: string;
  user_id: string;
  community_name: string;
  provider_id: string;
  language: string;
  constructor(
    private authService : AuthService,
    public navParams: NavParams,
    private router: Router,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    public modalCtrl: ModalController
  ) { }
  ngOnInit() {
    this.language = localStorage.getItem("language");
  }
  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  statusForm(form){
    this.ionLoader.showLoader();
    this.user_type = localStorage.getItem("user_type");
    this.community_id = localStorage.getItem("community_id");
    this.community_name = localStorage.getItem("community_name");
    this.provider_id = localStorage.getItem("provider_id");

    this.user_id = localStorage.getItem("user_id");
    var request_id = this.navParams.get('req_data');
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('community_name', this.community_name);
    meeting_post.append('provider_id', this.provider_id);
    meeting_post.append('request_id', request_id);
    meeting_post.append('task_status', form.value.status);
    this.authService.common('doneNotDoneTask',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.closeModal();
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/maintenance-list']); 
      }else{
         this.ionLoader.hideLoader();
         this.toastService.presentToast(res['message']);
      }
      })
  }
}
