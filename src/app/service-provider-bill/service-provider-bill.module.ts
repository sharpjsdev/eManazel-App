import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ServiceProviderBillPageRoutingModule } from './service-provider-bill-routing.module';

import { ServiceProviderBillPage } from './service-provider-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ServiceProviderBillPageRoutingModule
  ],
  declarations: [ServiceProviderBillPage,MenuHeaderPage]
})
export class ServiceProviderBillPageModule {}
