import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AdsPageRoutingModule } from './ads-routing.module';

import { AdsPage } from './ads.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdsPageRoutingModule,
    TranslateModule
  ],
  declarations: [AdsPage,MenuHeaderPage]
})
export class AdsPageModule {}
