import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { AdsDetailPageRoutingModule } from './ads-detail-routing.module';

import { AdsDetailPage } from './ads-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AdsDetailPageRoutingModule
  ],
  declarations: [AdsDetailPage ,MenuHeaderPage]
})
export class AdsDetailPageModule {}
