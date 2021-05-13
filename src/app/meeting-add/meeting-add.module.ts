import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingAddPageRoutingModule } from './meeting-add-routing.module';

import { MeetingAddPage } from './meeting-add.page';
import { TranslateModule } from '@ngx-translate/core';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MeetingAddPageRoutingModule
  ],
  declarations: [MeetingAddPage,MenuHeaderPage]
})
export class MeetingAddPageModule {}
