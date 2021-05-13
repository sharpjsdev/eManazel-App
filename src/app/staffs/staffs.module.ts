import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { StaffsPageRoutingModule } from './staffs-routing.module';

import { StaffsPage } from './staffs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    StaffsPageRoutingModule
  ],
  declarations: [StaffsPage,MenuHeaderPage]
})
export class StaffsPageModule {}
