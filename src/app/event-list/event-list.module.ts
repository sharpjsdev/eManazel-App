import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventListPageRoutingModule } from './event-list-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { EventListPage } from './event-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EventListPageRoutingModule
  ],
  declarations: [EventListPage,MenuHeaderPage]
})
export class EventListPageModule {}
