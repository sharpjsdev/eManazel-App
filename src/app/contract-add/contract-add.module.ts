import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ContractAddPageRoutingModule } from './contract-add-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ContractAddPage } from './contract-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ContractAddPageRoutingModule
  ],
  declarations: [ContractAddPage,MenuHeaderPage]
})
export class ContractAddPageModule {}
