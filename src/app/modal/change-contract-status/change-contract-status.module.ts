import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ChangeContractStatusPageRoutingModule } from './change-contract-status-routing.module';

import { ChangeContractStatusPage } from './change-contract-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ChangeContractStatusPageRoutingModule
  ],
  declarations: [ChangeContractStatusPage]
})
export class ChangeContractStatusPageModule {}
