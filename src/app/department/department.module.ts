import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepartmentPageRoutingModule } from './department-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { DepartmentPage } from './department.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    DepartmentPageRoutingModule
  ],
  declarations: [DepartmentPage,MenuHeaderPage]
})
export class DepartmentPageModule {}
