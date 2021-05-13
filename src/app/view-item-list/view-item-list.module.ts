import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ViewItemListPageRoutingModule } from './view-item-list-routing.module';

import { ViewItemListPage } from './view-item-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ViewItemListPageRoutingModule
  ],
  declarations: [ViewItemListPage,MenuHeaderPage]
})
export class ViewItemListPageModule {}
