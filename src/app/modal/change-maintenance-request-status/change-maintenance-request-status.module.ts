import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ChangeMaintenanceRequestStatusPageRoutingModule } from './change-maintenance-request-status-routing.module';

import { ChangeMaintenanceRequestStatusPage } from './change-maintenance-request-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ChangeMaintenanceRequestStatusPageRoutingModule
  ],
  declarations: [ChangeMaintenanceRequestStatusPage]
})
export class ChangeMaintenanceRequestStatusPageModule {}
