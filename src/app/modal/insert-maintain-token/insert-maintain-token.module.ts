import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InsertMaintainTokenPageRoutingModule } from './insert-maintain-token-routing.module';

import { InsertMaintainTokenPage } from './insert-maintain-token.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    InsertMaintainTokenPageRoutingModule
  ],
  declarations: [InsertMaintainTokenPage]
})
export class InsertMaintainTokenPageModule {}
