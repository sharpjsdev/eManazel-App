import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-complaint-reject',
  templateUrl: './complaint-reject.page.html',
  styleUrls: ['./complaint-reject.page.scss'],
})
export class ComplaintRejectPage implements OnInit {
  user_type: string;
  community_id: string;
  user_id: string;
  language: string;
  constructor(
    private authService : AuthService,
    public navParams: NavParams,
    private router: Router,
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
    this.user_type = localStorage.getItem("user_type");
    this.community_id = localStorage.getItem("community_id");
    this.user_id = localStorage.getItem("user_id");
    var id = this.navParams.get('id');
    var status = this.navParams.get('status');
    var type = this.navParams.get('type');
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    if(type == 'event'){
      meeting_post.append('event_id', id);
      var url = "responseToEvent";
    }else if(type == 'ads'){
      meeting_post.append('ads_id', id);
      var url = "responseToAds";
    }else{
      meeting_post.append('complaint_id', id);
      var url = "responseToComplaintRequest";
    }
    
    meeting_post.append('status', status);
    meeting_post.append('reason', form.value.reason);
    this.authService.common(url,meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.closeModal();
        this.toastService.presentToast(res['message']);
        if(type == 'event'){
          this.router.navigate(['/my-events']); 
        }else if(type == 'ads'){
          this.router.navigate(['/my-ads']); 
        }else{
          this.router.navigate(['/complaint']); 
        }
        
      }else{
         this.toastService.presentToast(res['message']);
      }
      })
  }
}
