import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { AdsDetailsPageRoutingModule } from './ads-details-routing.module';

import { AdsDetailsPage } from './ads-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AdsDetailsPageRoutingModule
  ],
  declarations: [AdsDetailsPage,MenuHeaderPage]
})
export class AdsDetailsPageModule {}
