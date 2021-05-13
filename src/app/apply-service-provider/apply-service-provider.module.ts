import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApplyServiceProviderPageRoutingModule } from './apply-service-provider-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ApplyServiceProviderPage } from './apply-service-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ApplyServiceProviderPageRoutingModule
  ],
  declarations: [ApplyServiceProviderPage,MenuHeaderPage]
})
export class ApplyServiceProviderPageModule {}
