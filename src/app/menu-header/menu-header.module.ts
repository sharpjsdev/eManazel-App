import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { MenuHeaderPageRoutingModule } from './menu-header-routing.module';

import { MenuHeaderPage } from './menu-header.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MenuHeaderPageRoutingModule
  ],
  declarations: [MenuHeaderPage]
})
export class MenuHeaderPageModule {}
