import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProviderDetailsPageRoutingModule } from './service-provider-details-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceProviderDetailsPage } from './service-provider-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ServiceProviderDetailsPageRoutingModule
  ],
  declarations: [ServiceProviderDetailsPage,MenuHeaderPage]
})
export class ServiceProviderDetailsPageModule {}
