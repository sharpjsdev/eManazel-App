import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { AddDepartmentPageRoutingModule } from './add-department-routing.module';

import { AddDepartmentPage } from './add-department.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AddDepartmentPageRoutingModule
  ],
  declarations: [AddDepartmentPage,MenuHeaderPage]
})
export class AddDepartmentPageModule {}
