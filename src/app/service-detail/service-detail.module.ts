import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceDetailPageRoutingModule } from './service-detail-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceDetailPage } from './service-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ServiceDetailPageRoutingModule
  ],
  declarations: [ServiceDetailPage,MenuHeaderPage]
})
export class ServiceDetailPageModule {}
