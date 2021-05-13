import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { NoticeAddPageRoutingModule } from './notice-add-routing.module';

import { NoticeAddPage } from './notice-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NoticeAddPageRoutingModule
  ],
  declarations: [NoticeAddPage,MenuHeaderPage]
})
export class NoticeAddPageModule {}
