import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ResidentEditPageRoutingModule } from './resident-edit-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ResidentEditPage } from './resident-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ResidentEditPageRoutingModule
  ],
  declarations: [ResidentEditPage,MenuHeaderPage]
})
export class ResidentEditPageModule {}
