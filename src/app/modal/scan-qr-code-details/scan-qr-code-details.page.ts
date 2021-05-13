import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toast.service';
import { NavParams, ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scan-qr-code-details',
  templateUrl: './scan-qr-code-details.page.html',
  styleUrls: ['./scan-qr-code-details.page.scss'],
})
export class ScanQrCodeDetailsPage implements OnInit {
  user_type: string;
  user_id: string;
  community_id: string;
  visitor_details: any;
  vehicle_array: any;
  qr_code: any;
  language: string;

  constructor(
    private authService : AuthService,
    public navParams: NavParams,
    private router: Router,
    private toastService: ToastService,
    public modalCtrl: ModalController
  ) { 
    console.log(navParams.get('details'));
  }

  ngOnInit() {
    this.visitor_details =this.navParams.get('details'); 
    this.qr_code =this.navParams.get('qr_code'); 
    var str = this.visitor_details.vehicle;
    this.vehicle_array = str.split(":");
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    this.language = localStorage.getItem("language");
  }
  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  inClick(){
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('qr_code', this.qr_code);
    meeting_post.append('in_out_status', '1');
    this.authService.common('inOutGuestByQrCode',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.closeModal();
        this.toastService.presentToast(res['message']);
      }else{
      this.toastService.presentToast(res['message']);
      }
    });
  }
  outClick(){
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('qr_code', this.qr_code);
    meeting_post.append('in_out_status', '2');
    this.authService.common('inOutGuestByQrCode',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.closeModal();
        this.toastService.presentToast(res['message']);
      }else{
      this.toastService.presentToast(res['message']);
      }
    });
  }
  rejectClick(){
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('qr_code', this.qr_code);
    this.authService.common('rejectGuestByQrCode',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.closeModal();
        this.toastService.presentToast(res['message']);
      }else{
      this.toastService.presentToast(res['message']);
      }
    });
  }
}
