import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { MaintenanceAddPageRoutingModule } from './maintenance-add-routing.module';

import { MaintenanceAddPage } from './maintenance-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MaintenanceAddPageRoutingModule
  ],
  declarations: [MaintenanceAddPage,MenuHeaderPage]
})
export class MaintenanceAddPageModule {}
