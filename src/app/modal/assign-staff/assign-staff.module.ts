import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AssignStaffPageRoutingModule } from './assign-staff-routing.module';

import { AssignStaffPage } from './assign-staff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AssignStaffPageRoutingModule
  ],
  declarations: [AssignStaffPage]
})
export class AssignStaffPageModule {}
