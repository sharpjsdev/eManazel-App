import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ContractDetailPageRoutingModule } from './contract-detail-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ContractDetailPage } from './contract-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ContractDetailPageRoutingModule
  ],
  declarations: [ContractDetailPage , MenuHeaderPage]
})
export class ContractDetailPageModule {}
