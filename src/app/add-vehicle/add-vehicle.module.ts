import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { AddVehiclePageRoutingModule } from './add-vehicle-routing.module';

import { AddVehiclePage } from './add-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddVehiclePageRoutingModule
  ],
  declarations: [AddVehiclePage,MenuHeaderPage]
})
export class AddVehiclePageModule {}
