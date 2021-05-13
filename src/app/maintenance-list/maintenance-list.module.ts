import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { MaintenanceListPageRoutingModule } from './maintenance-list-routing.module';

import { MaintenanceListPage } from './maintenance-list.page';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    Ng2GoogleChartsModule,
    MaintenanceListPageRoutingModule
  ],
  declarations: [MaintenanceListPage , MenuHeaderPage]
})
export class MaintenanceListPageModule {}
