import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { FlatDetailsPageRoutingModule } from './flat-details-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { FlatDetailsPage } from './flat-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FlatDetailsPageRoutingModule
  ],
  declarations: [FlatDetailsPage,MenuHeaderPage]
})
export class FlatDetailsPageModule {}
