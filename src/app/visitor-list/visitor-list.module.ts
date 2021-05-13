import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { VisitorListPageRoutingModule } from './visitor-list-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { VisitorListPage } from './visitor-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VisitorListPageRoutingModule
  ],
  declarations: [VisitorListPage,MenuHeaderPage]
})
export class VisitorListPageModule {}
