import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { NoticeListPageRoutingModule } from './notice-list-routing.module';

import { NoticeListPage } from './notice-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NoticeListPageRoutingModule
  ],
  declarations: [NoticeListPage,MenuHeaderPage]
})
export class NoticeListPageModule {}
