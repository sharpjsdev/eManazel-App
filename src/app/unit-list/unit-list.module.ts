import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnitListPageRoutingModule } from './unit-list-routing.module';

import { UnitListPage } from './unit-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnitListPageRoutingModule
  ],
  declarations: [UnitListPage]
})
export class UnitListPageModule {}
