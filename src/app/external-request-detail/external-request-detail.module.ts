import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ExternalRequestDetailPageRoutingModule } from './external-request-detail-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ExternalRequestDetailPage } from './external-request-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ExternalRequestDetailPageRoutingModule
  ],
  declarations: [ExternalRequestDetailPage,MenuHeaderPage]
})
export class ExternalRequestDetailPageModule {}
