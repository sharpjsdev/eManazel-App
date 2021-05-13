import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditNoticePageRoutingModule } from './edit-notice-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { EditNoticePage } from './edit-notice.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EditNoticePageRoutingModule
  ],
  declarations: [EditNoticePage,MenuHeaderPage]
})
export class EditNoticePageModule {}
