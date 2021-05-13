import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComplaintDetailPageRoutingModule } from './complaint-detail-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ComplaintDetailPage } from './complaint-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComplaintDetailPageRoutingModule
  ],
  declarations: [ComplaintDetailPage,MenuHeaderPage]
})
export class ComplaintDetailPageModule {}
