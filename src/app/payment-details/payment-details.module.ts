import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { PaymentDetailsPageRoutingModule } from './payment-details-routing.module';

import { PaymentDetailsPage } from './payment-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    PaymentDetailsPageRoutingModule
  ],
  declarations: [PaymentDetailsPage,MenuHeaderPage]
})
export class PaymentDetailsPageModule {}
