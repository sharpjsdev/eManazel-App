import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ContractsPageRoutingModule } from './contracts-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ContractsPage } from './contracts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ContractsPageRoutingModule
  ],
  declarations: [ContractsPage,MenuHeaderPage]
})
export class ContractsPageModule {}
