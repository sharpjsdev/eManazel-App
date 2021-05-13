import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ParkingListPageRoutingModule } from './parking-list-routing.module';

import { ParkingListPage } from './parking-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ParkingListPageRoutingModule
  ],
  declarations: [ParkingListPage,MenuHeaderPage]
})
export class ParkingListPageModule {}
