import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResidentDetailsPageRoutingModule } from './resident-details-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { ResidentDetailsPage } from './resident-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ResidentDetailsPageRoutingModule
  ],
  declarations: [ResidentDetailsPage,MenuHeaderPage]
})
export class ResidentDetailsPageModule {}
