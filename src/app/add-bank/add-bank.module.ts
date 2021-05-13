import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddBankPageRoutingModule } from './add-bank-routing.module';

import { AddBankPage } from './add-bank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddBankPageRoutingModule
  ],
  declarations: [AddBankPage,MenuHeaderPage]
})
export class AddBankPageModule {}
