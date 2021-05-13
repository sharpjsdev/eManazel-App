import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { BuildingDetailPageRoutingModule } from './building-detail-routing.module';

import { BuildingDetailPage } from './building-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    BuildingDetailPageRoutingModule
  ],
  declarations: [BuildingDetailPage,MenuHeaderPage]
})
export class BuildingDetailPageModule {}
