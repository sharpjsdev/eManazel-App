import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { BuildingAddPageRoutingModule } from './building-add-routing.module';

import { BuildingAddPage } from './building-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    BuildingAddPageRoutingModule
  ],
  declarations: [BuildingAddPage,MenuHeaderPage]
})
export class BuildingAddPageModule {}
