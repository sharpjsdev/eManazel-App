import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ViolationDetailPageRoutingModule } from './violation-detail-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ViolationDetailPage } from './violation-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ViolationDetailPageRoutingModule
  ],
  declarations: [ViolationDetailPage , MenuHeaderPage]
})
export class ViolationDetailPageModule {}
