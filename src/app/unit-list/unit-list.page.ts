import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PopoverController, } from '@ionic/angular';
@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.page.html',
  styleUrls: ['./unit-list.page.scss'],
})
export class UnitListPage implements OnInit {
  flats: any;
  user_type: string;
  user_id: string;
  community_id: string;
  keyword: string;
  constructor(
    private popoverController: PopoverController,
    private authService: AuthService
  ) { }

  ngOnInit() {
    console.log(this.keyword);
  }
  ionViewWillEnter(): void {
    this.user_type = localStorage.getItem("user_type");
    this.user_id = localStorage.getItem("user_id");
    this.community_id = localStorage.getItem("community_id");
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    this.authService.common('getMemberFlats',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.flats = res['data'];   
      }
    })
  }
  searchByUnit(id){
    let meeting_post = new FormData();
    meeting_post.append('user_type', this.user_type);
    meeting_post.append('user_id', this.user_id); 
    meeting_post.append('community_id', this.community_id);
    meeting_post.append('keyword', this.keyword);
    meeting_post.append('unit_id', id);
    this.authService.common('getBills',meeting_post).subscribe((res) => {
      if(res['success']=='1'){
        this.popoverController.dismiss(res['data']);
        //this.ionLoader.hideLoader();
        //this.bills = res['data']; 

      }else{
        //this.ionLoader.hideLoader();
        //this.toastService.presentToast(res['message']);
      }
      })
  }
}
