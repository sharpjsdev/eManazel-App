import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { MeetingListPageRoutingModule } from './meeting-list-routing.module';

import { MeetingListPage } from './meeting-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MeetingListPageRoutingModule
  ],
  declarations: [MeetingListPage,MenuHeaderPage]
})
export class MeetingListPageModule {}
