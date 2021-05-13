import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { AdminContractPageRoutingModule } from './admin-contract-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { AdminContractPage } from './admin-contract.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2GoogleChartsModule,
    TranslateModule,
    AdminContractPageRoutingModule
  ],
  declarations: [AdminContractPage,MenuHeaderPage]
})
export class AdminContractPageModule {}
