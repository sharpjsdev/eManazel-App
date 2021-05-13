import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { VisitorDetailPageRoutingModule } from './visitor-detail-routing.module';

import { VisitorDetailPage } from './visitor-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VisitorDetailPageRoutingModule
  ],
  declarations: [VisitorDetailPage,MenuHeaderPage]
})
export class VisitorDetailPageModule {}
