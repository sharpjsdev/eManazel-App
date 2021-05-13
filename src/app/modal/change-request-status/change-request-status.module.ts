import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ChangeRequestStatusPageRoutingModule } from './change-request-status-routing.module';

import { ChangeRequestStatusPage } from './change-request-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ChangeRequestStatusPageRoutingModule
  ],
  declarations: [ChangeRequestStatusPage]
})
export class ChangeRequestStatusPageModule {}
