import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServiceProviderPageRoutingModule } from './service-provider-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceProviderPage } from './service-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ServiceProviderPageRoutingModule
  ],
  declarations: [ServiceProviderPage,MenuHeaderPage]
})
export class ServiceProviderPageModule {}
