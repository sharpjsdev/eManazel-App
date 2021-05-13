import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { AddItemPageRoutingModule } from './add-item-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { AddItemPage } from './add-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddItemPageRoutingModule
  ],
  declarations: [AddItemPage , MenuHeaderPage]
})
export class AddItemPageModule {}
