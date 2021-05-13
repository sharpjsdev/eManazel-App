import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-insert-maintain-token',
  templateUrl: './insert-maintain-token.page.html',
  styleUrls: ['./insert-maintain-token.page.scss'],
})
export class InsertMaintainTokenPage implements OnInit {
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
  async closeModal() {
    const onClosedData: string = "";
    await this.modalCtrl.dismiss(onClosedData);
   
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
    console.log(request_type);
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('request_id', request_id);
    if(request_type == 'start_token'){
      meeting_post.append('start_token', form.value.token);
      var url ='staffResponceToStartJob';
    }else{
      meeting_post.append('end_token', form.value.token);
      var url ='staffResponceToEndJob';
    }    
    this.authService.common(url,meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.modalCtrl.dismiss(1);
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
