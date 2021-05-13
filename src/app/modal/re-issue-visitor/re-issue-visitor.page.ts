import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';
import { ToastService } from '../../services/toast.service';
@Component({
  selector: 'app-re-issue-visitor',
  templateUrl: './re-issue-visitor.page.html',
  styleUrls: ['./re-issue-visitor.page.scss'],
})
export class ReIssueVisitorPage implements OnInit {
  date:any;
  time:any;
  user_type: string;
  community_id: string;
  language: string;
  constructor(
    private authService : AuthService,
    public navParams: NavParams,
    private datePicker: DatePicker,
    private router: Router,
    private ionLoader: LoaderService,
    private toastService: ToastService,
    public modalCtrl: ModalController
  ) {
    console.log(navParams.get('visitor_data'));
   }
   showDate() {
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
        this.date = date.getFullYear()+"-"+("0" + (date.getMonth() + 1)).slice(-2)+"-"+("0" + date.getDate()).slice(-2);
      },
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  // Show only time
  showTime() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then(
      time => {        
        this.time =  this.formatAMPM(time);
      },
      err => console.log('Error occurred while getting time: ', err)
    );
  }
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm; 
    return strTime;
  }
  ngOnInit() {
    this.language = localStorage.getItem("language");
  }
  public closeModal() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }
  visitorForm(form){
    this.ionLoader.showLoader();
    this.user_type = localStorage.getItem("user_type");
    this.community_id = localStorage.getItem("community_id");
    var visitor_info = this.navParams.get('visitor_data');
    console.log(visitor_info.country_code);
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', visitor_info.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('name', visitor_info.name);        
    meeting_post.append('visit_date', form.value.date);        
    meeting_post.append('visit_time', form.value.time);        
    meeting_post.append('visit_days', visitor_info.days);        
    meeting_post.append('flat_id', visitor_info.flat_id);        
    meeting_post.append('info', visitor_info.info);        
    meeting_post.append('code', visitor_info.country_code);        
    meeting_post.append('mobile', visitor_info.mobile);        
    meeting_post.append('member_id', visitor_info.user_id);        
    meeting_post.append('guest_type', visitor_info.guest_type);        
    meeting_post.append('email', visitor_info.email);        
    meeting_post.append('type',visitor_info.type);        
    meeting_post.append('image',visitor_info.image);        
    meeting_post.append('vehicle',visitor_info.vehicle); 
    this.authService.common('addGuest',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.closeModal();
         this.ionLoader.hideLoader();
         this.toastService.presentToast(res['message']);
        this.router.navigate(['/visitor-list']); 
      }else{
         this.ionLoader.hideLoader();
         this.toastService.presentToast(res['message']);
      }
      })
  }
}
