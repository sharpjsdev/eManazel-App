import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPaymentPageRoutingModule } from './add-payment-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddPaymentPage } from './add-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddPaymentPageRoutingModule
  ],
  declarations: [AddPaymentPage,MenuHeaderPage]
})
export class AddPaymentPageModule {}
