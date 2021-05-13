import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddServiceProviderPageRoutingModule } from './add-service-provider-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { SharedPasswordMatchPageModule } from '../shared-password-match/shared-password-match.module';
import { AddServiceProviderPage } from './add-service-provider.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,    
    AddServiceProviderPageRoutingModule,
    SharedPasswordMatchPageModule
  ],
  declarations: [AddServiceProviderPage,MenuHeaderPage]
})
export class AddServiceProviderPageModule {}
