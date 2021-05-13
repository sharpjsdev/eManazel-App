import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { NotificationListPageRoutingModule } from './notification-list-routing.module';

import { NotificationListPage } from './notification-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NotificationListPageRoutingModule
  ],
  declarations: [NotificationListPage]
})
export class NotificationListPageModule {}
