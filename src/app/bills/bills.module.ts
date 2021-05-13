import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { BillsPageRoutingModule } from './bills-routing.module';

import { BillsPage } from './bills.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    BillsPageRoutingModule
  ],
  declarations: [BillsPage,MenuHeaderPage]
})
export class BillsPageModule {}
