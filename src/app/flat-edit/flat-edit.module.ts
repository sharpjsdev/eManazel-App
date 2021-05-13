import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FlatEditPageRoutingModule } from './flat-edit-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { FlatEditPage } from './flat-edit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    FlatEditPageRoutingModule
  ],
  declarations: [FlatEditPage,MenuHeaderPage]
})
export class FlatEditPageModule {}
