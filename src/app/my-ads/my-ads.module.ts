import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { MyAdsPageRoutingModule } from './my-ads-routing.module';

import { MyAdsPage } from './my-ads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MyAdsPageRoutingModule
  ],
  declarations: [MyAdsPage,MenuHeaderPage]
})
export class MyAdsPageModule {}
