import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { IonicModule } from '@ionic/angular';

import { EventEditPageRoutingModule } from './event-edit-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { EventEditPage } from './event-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EventEditPageRoutingModule
  ],
  declarations: [EventEditPage,MenuHeaderPage]
})
export class EventEditPageModule {}
