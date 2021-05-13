import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddParkingPageRoutingModule } from './add-parking-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddParkingPage } from './add-parking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddParkingPageRoutingModule
  ],
  declarations: [AddParkingPage,MenuHeaderPage]
})
export class AddParkingPageModule {}
