import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddActionPageRoutingModule } from './add-action-routing.module';

import { AddActionPage } from './add-action.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddActionPageRoutingModule
  ],
  declarations: [AddActionPage,MenuHeaderPage]
})
export class AddActionPageModule {}
