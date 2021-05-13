import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-assign-member',
  templateUrl: './assign-member.page.html',
  styleUrls: ['./assign-member.page.scss'],
})
export class AssignMemberPage implements OnInit {
  user_type: string;
  community_id: string;
  user_id: string;
  member: any = [];
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
    this.user_type = localStorage.getItem("user_type");
      this.community_id = localStorage.getItem("community_id");
      this.user_id = localStorage.getItem("user_id");
      this.language = localStorage.getItem("language");
      var flat_id = this.navParams.get('flat_id');
      let meeting_post = new FormData();
      meeting_post.append('user_type', this.user_type);
      meeting_post.append('user_id', this.user_id); 
      meeting_post.append('community_id', this.community_id);
      meeting_post.append('flat_id', flat_id);
      this.authService.common('getNotAssignedMember',meeting_post).subscribe((res) => {
        if(res['success']=='1'){
          this.member = res['data'];
          console.log(this.member);
        }
      })
    
  }
  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  assignForm(form){
    this.ionLoader.showLoader();
    this.user_type = localStorage.getItem("user_type");
    this.community_id = localStorage.getItem("community_id");
    this.user_id = localStorage.getItem("user_id");
    var flat_id = this.navParams.get('flat_id');
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('flat_id', flat_id);
    meeting_post.append('resident_ids', form.value.members);
    this.authService.common('assigMemberToFlat',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.closeModal();
        this.ionLoader.hideLoader();
        this.toastService.presentToast(res['message']);
        this.router.navigate(['/flat-list']); 
      }else{
         this.ionLoader.hideLoader();
         this.toastService.presentToast(res['message']);
      }
      })
  }
}
