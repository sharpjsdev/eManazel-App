import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { MaintenanceDetailPageRoutingModule } from './maintenance-detail-routing.module';

import { MaintenanceDetailPage } from './maintenance-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceDetailPageRoutingModule
  ],
  declarations: [MaintenanceDetailPage,MenuHeaderPage]
})
export class MaintenanceDetailPageModule {}
