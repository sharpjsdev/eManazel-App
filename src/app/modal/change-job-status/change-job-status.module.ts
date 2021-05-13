import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ChangeJobStatusPageRoutingModule } from './change-job-status-routing.module';

import { ChangeJobStatusPage } from './change-job-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ChangeJobStatusPageRoutingModule
  ],
  declarations: [ChangeJobStatusPage]
})
export class ChangeJobStatusPageModule {}
