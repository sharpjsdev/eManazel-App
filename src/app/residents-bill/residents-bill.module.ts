import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { ResidentsBillPageRoutingModule } from './residents-bill-routing.module';

import { ResidentsBillPage } from './residents-bill.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ResidentsBillPageRoutingModule
  ],
  declarations: [ResidentsBillPage,MenuHeaderPage]
})
export class ResidentsBillPageModule {}
