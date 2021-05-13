import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ServiceProviderAgreementPageRoutingModule } from './service-provider-agreement-routing.module';

import { ServiceProviderAgreementPage } from './service-provider-agreement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ServiceProviderAgreementPageRoutingModule
  ],
  declarations: [ServiceProviderAgreementPage , MenuHeaderPage]
})
export class ServiceProviderAgreementPageModule {}
