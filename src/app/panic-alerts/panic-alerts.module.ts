import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { PanicAlertsPageRoutingModule } from './panic-alerts-routing.module';

import { PanicAlertsPage } from './panic-alerts.page';

@NgModule({ 
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PanicAlertsPageRoutingModule
  ],
  declarations: [PanicAlertsPage , MenuHeaderPage]
})
export class PanicAlertsPageModule {}
