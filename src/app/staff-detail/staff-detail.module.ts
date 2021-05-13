import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { StaffDetailPageRoutingModule } from './staff-detail-routing.module';

import { StaffDetailPage } from './staff-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    StaffDetailPageRoutingModule
  ],
  declarations: [StaffDetailPage,MenuHeaderPage]
})
export class StaffDetailPageModule {}
