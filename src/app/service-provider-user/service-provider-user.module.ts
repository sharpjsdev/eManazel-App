import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ServiceProviderUserPageRoutingModule } from './service-provider-user-routing.module';

import { ServiceProviderUserPage } from './service-provider-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ServiceProviderUserPageRoutingModule
  ],
  declarations: [ServiceProviderUserPage,MenuHeaderPage]
})
export class ServiceProviderUserPageModule {}
