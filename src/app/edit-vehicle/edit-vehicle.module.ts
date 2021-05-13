import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { EditVehiclePageRoutingModule } from './edit-vehicle-routing.module';

import { EditVehiclePage } from './edit-vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EditVehiclePageRoutingModule
  ],
  declarations: [EditVehiclePage,MenuHeaderPage]
})
export class EditVehiclePageModule {}
