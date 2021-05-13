import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { VehicleListPageRoutingModule } from './vehicle-list-routing.module';

import { VehicleListPage } from './vehicle-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VehicleListPageRoutingModule
  ],
  declarations: [VehicleListPage,MenuHeaderPage]
})
export class VehicleListPageModule {}
