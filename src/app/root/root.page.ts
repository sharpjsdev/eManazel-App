import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TranslateConfigService } from '../services/translate-config.service';
@Component({
  selector: 'app-root',
  templateUrl: './root.page.html',
  styleUrls: ['./root.page.scss'],
})
export class RootPage implements OnInit {

  constructor(
    public menuCtrl: MenuController, 
    private translateConfigService: TranslateConfigService,
  ) { }

  ngOnInit() {
  }
  ionViewWillEnter() {	  
    this.menuCtrl.enable(false);
    if(localStorage.getItem('language')!=null){      
      this.translateConfigService.setLanguage(localStorage.getItem('language'));
    }else{
      localStorage.setItem('language','en');
      this.translateConfigService.setLanguage(localStorage.getItem('language'));
    }
  }
  ionViewWillLeave() {
		this.menuCtrl.enable(true);
	}

}
