import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { InsertTokenPageRoutingModule } from './insert-token-routing.module';

import { InsertTokenPage } from './insert-token.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    InsertTokenPageRoutingModule
  ],
  declarations: [InsertTokenPage]
})
export class InsertTokenPageModule {}
