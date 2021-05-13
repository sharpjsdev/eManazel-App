import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-assign-staff',
  templateUrl: './assign-staff.page.html',
  styleUrls: ['./assign-staff.page.scss'],
})
export class AssignStaffPage implements OnInit {
  user_type: string;
  community_id: string;
  user_id: string;
  display: string;
  provider_id: string;
  staffs: any = [];
  user_name: string;
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
    this.display = "display:none";
    this.language = localStorage.getItem("language");
  }
  statusForm(form){
    this.ionLoader.showLoader();
    this.user_type = localStorage.getItem("user_type");
    this.community_id = localStorage.getItem("community_id");
    this.user_id = localStorage.getItem("user_id");
 
    this.user_name = localStorage.getItem("user_name");
    var request_id = this.navParams.get('req_data');
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('user_name', this.user_name); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('request_id', request_id);
    meeting_post.append('staff_id', form.value.staff_id);
    meeting_post.append('status', form.value.status);
    this.authService.common('assignServiceProviderStaff',meeting_post).subscribe((res) => {
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

  getStaff(ev){
    var status = ev.target.value;
    if(status == 1){
      this.display = "display:block";
      this.user_type = localStorage.getItem("user_type");
      this.community_id = localStorage.getItem("community_id");
      this.user_id = localStorage.getItem("user_id");
      this.provider_id = localStorage.getItem("provider_id");
      let meeting_post = new FormData();
      meeting_post.append('user_type', this.user_type);
      meeting_post.append('user_id', this.user_id); 
      meeting_post.append('community_id', this.community_id);
      if(this.user_type =='4'){
        this.provider_id = this.navParams.get('provider_id');
      }
      meeting_post.append('provider_id', this.provider_id);
      this.authService.common('getServiceProviderTechnician',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.staffs = res['data'];
        }
        })
    }else{
      this.staffs = [];
      this.display = "display:none";
    }
  }
}
