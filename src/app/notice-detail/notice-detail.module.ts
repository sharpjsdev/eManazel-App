import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { NoticeDetailPageRoutingModule } from './notice-detail-routing.module';

import { NoticeDetailPage } from './notice-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NoticeDetailPageRoutingModule
  ],
  declarations: [NoticeDetailPage,MenuHeaderPage]
})
export class NoticeDetailPageModule {}
