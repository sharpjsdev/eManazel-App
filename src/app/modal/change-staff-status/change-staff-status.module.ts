import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ChangeStaffStatusPageRoutingModule } from './change-staff-status-routing.module';

import { ChangeStaffStatusPage } from './change-staff-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ChangeStaffStatusPageRoutingModule
  ],
  declarations: [ChangeStaffStatusPage]
})
export class ChangeStaffStatusPageModule {}
