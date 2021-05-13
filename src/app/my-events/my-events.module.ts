import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { MyEventsPageRoutingModule } from './my-events-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { MyEventsPage } from './my-events.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    MyEventsPageRoutingModule
  ],
  declarations: [MyEventsPage,MenuHeaderPage]
})
export class MyEventsPageModule {}
