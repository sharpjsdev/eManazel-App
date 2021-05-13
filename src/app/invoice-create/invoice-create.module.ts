import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { InvoiceCreatePageRoutingModule } from './invoice-create-routing.module';

import { InvoiceCreatePage } from './invoice-create.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    InvoiceCreatePageRoutingModule
  ],
  declarations: [InvoiceCreatePage,MenuHeaderPage]
})
export class InvoiceCreatePageModule {}
