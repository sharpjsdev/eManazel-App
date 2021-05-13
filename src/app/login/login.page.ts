import { Component, OnInit } from '@angular/core';
import { TranslateConfigService } from '../services/translate-config.service';
import { NavController, MenuController , Platform } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
type:any;
selectedLanguage:string;
  constructor(
    private translateConfigService: TranslateConfigService,
    public menuCtrl: MenuController,
  ) {
    this.translateConfigService.setLanguage(localStorage.getItem('language'));
    
   }
  ionViewWillEnter() {	  
    this.menuCtrl.enable(false);
  }
  ionViewWillLeave() {
		this.menuCtrl.enable(true);
	}
  ngOnInit() {
  }
  segmentChanged(ev){
    this.type = ev.target.value;
  }
  languageChanged(){
    this.translateConfigService.setLanguage(this.selectedLanguage);
  }
}
