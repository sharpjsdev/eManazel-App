import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ExternalRequestListPageRoutingModule } from './external-request-list-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ExternalRequestListPage } from './external-request-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ExternalRequestListPageRoutingModule
  ],
  declarations: [ExternalRequestListPage,MenuHeaderPage]
})
export class ExternalRequestListPageModule {}
