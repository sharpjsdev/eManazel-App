import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ResidentListPageRoutingModule } from './resident-list-routing.module';

import { ResidentListPage } from './resident-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ResidentListPageRoutingModule
  ],
  declarations: [ResidentListPage,MenuHeaderPage]
})
export class ResidentListPageModule {}
