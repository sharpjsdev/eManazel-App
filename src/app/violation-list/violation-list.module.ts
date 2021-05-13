import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ViolationListPageRoutingModule } from './violation-list-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ViolationListPage } from './violation-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ViolationListPageRoutingModule
  ],
  declarations: [ViolationListPage,MenuHeaderPage]
})
export class ViolationListPageModule {}
