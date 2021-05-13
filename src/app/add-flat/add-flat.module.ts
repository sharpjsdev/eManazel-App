import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { AddFlatPageRoutingModule } from './add-flat-routing.module';

import { AddFlatPage } from './add-flat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddFlatPageRoutingModule
  ],
  declarations: [AddFlatPage,MenuHeaderPage]
})
export class AddFlatPageModule {}
