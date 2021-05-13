import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EditBankPageRoutingModule } from './edit-bank-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { EditBankPage } from './edit-bank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EditBankPageRoutingModule
  ],
  declarations: [EditBankPage,MenuHeaderPage]
})
export class EditBankPageModule {}
