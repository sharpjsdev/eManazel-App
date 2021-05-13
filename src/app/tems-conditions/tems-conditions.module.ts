import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemsConditionsPageRoutingModule } from './tems-conditions-routing.module';

import { TemsConditionsPage } from './tems-conditions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemsConditionsPageRoutingModule
  ],
  declarations: [TemsConditionsPage]
})
export class TemsConditionsPageModule {}
