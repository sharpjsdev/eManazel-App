import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ComplaintPageRoutingModule } from './complaint-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ComplaintPage } from './complaint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ComplaintPageRoutingModule
  ],
  declarations: [ComplaintPage,MenuHeaderPage]
})
export class ComplaintPageModule {}
