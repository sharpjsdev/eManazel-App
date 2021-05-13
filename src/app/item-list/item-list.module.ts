import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ItemListPageRoutingModule } from './item-list-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ItemListPage } from './item-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ItemListPageRoutingModule
  ],
  declarations: [ItemListPage,MenuHeaderPage]
})
export class ItemListPageModule {}
