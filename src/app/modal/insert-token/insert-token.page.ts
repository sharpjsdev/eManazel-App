import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-insert-token',
  templateUrl: './insert-token.page.html',
  styleUrls: ['./insert-token.page.scss'],
})
export class InsertTokenPage implements OnInit {
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
  ) { }
  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  ngOnInit() {
    this.language = localStorage.getItem("language");
    
  }
  tokenForm(form){
    this.ionLoader.showLoader();
    this.user_type = localStorage.getItem("user_type");
    this.community_id = localStorage.getItem("community_id");
    this.user_id = localStorage.getItem("user_id");
    var request_id = this.navParams.get('req_id');
    var request_type = this.navParams.get('req_type');
    var before_img = this.navParams.get('before_img');
    var after_img = this.navParams.get('after_img');
    console.log(request_type);
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('request_id', request_id);
    if(request_type == 'start_token'){
      meeting_post.append('start_token', form.value.token);
      var url ='staffExternalServiceResponceToStartJob';
    }else{
      meeting_post.append('end_token', form.value.token);
      meeting_post.append('before_img', before_img);
      meeting_post.append('after_img', after_img);
      var url ='staffExternalServiceResponceToEndJob';
    }    
    this.authService.common(url,meeting_post).subscribe((res) => {
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
