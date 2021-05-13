import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { BuildingServicePageRoutingModule } from './building-service-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { BuildingServicePage } from './building-service.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    BuildingServicePageRoutingModule
  ],
  declarations: [BuildingServicePage,MenuHeaderPage]
})
export class BuildingServicePageModule {}
