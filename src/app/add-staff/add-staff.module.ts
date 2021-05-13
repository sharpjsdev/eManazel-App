import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { IonicModule } from '@ionic/angular';

import { AddStaffPageRoutingModule } from './add-staff-routing.module';
import { SharedPasswordMatchPageModule } from '../shared-password-match/shared-password-match.module';
import { AddStaffPage } from './add-staff.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddStaffPageRoutingModule,
    SharedPasswordMatchPageModule
  ],
  declarations: [AddStaffPage , MenuHeaderPage]
})
export class AddStaffPageModule {}
