import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlatListPageRoutingModule } from './flat-list-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { FlatListPage } from './flat-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FlatListPageRoutingModule
  ],
  declarations: [FlatListPage,MenuHeaderPage]
})
export class FlatListPageModule {}
