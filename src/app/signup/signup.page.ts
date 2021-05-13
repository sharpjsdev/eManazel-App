import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  type:any;
  constructor(
    public menuCtrl: MenuController
    ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {	  
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
		this.menuCtrl.enable(true);
	}
  segmentChanged(ev){
    this.type = ev.target.value;
  }
}
