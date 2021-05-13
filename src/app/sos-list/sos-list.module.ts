import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SosListPageRoutingModule } from './sos-list-routing.module';

import { SosListPage } from './sos-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SosListPageRoutingModule
  ],
  declarations: [SosListPage,MenuHeaderPage]
})
export class SosListPageModule {}
