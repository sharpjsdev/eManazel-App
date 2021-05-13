import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComplaintAddPageRoutingModule } from './complaint-add-routing.module';

import { ComplaintAddPage } from './complaint-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComplaintAddPageRoutingModule
  ],
  declarations: [ComplaintAddPage,MenuHeaderPage]
})
export class ComplaintAddPageModule {}
