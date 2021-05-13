import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { AdsAddPageRoutingModule } from './ads-add-routing.module';

import { AdsAddPage } from './ads-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AdsAddPageRoutingModule
  ],
  declarations: [AdsAddPage,MenuHeaderPage]
})
export class AdsAddPageModule {}
