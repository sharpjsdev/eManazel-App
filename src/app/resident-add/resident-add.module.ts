import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ResidentAddPageRoutingModule } from './resident-add-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ResidentAddPage } from './resident-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ResidentAddPageRoutingModule
  ],
  declarations: [ResidentAddPage,MenuHeaderPage]
})
export class ResidentAddPageModule {}
