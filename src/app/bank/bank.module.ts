import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { BankPageRoutingModule } from './bank-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { BankPage } from './bank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    BankPageRoutingModule
  ],
  declarations: [BankPage,MenuHeaderPage]
})
export class BankPageModule {}
