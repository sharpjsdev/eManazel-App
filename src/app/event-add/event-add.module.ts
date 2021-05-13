import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { EventAddPageRoutingModule } from './event-add-routing.module';

import { EventAddPage } from './event-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EventAddPageRoutingModule
  ],
  declarations: [EventAddPage,MenuHeaderPage]
})
export class EventAddPageModule {}
