import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddViolationPageRoutingModule } from './add-violation-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { AddViolationPage } from './add-violation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddViolationPageRoutingModule
  ],
  declarations: [AddViolationPage,MenuHeaderPage]
})
export class AddViolationPageModule {}
