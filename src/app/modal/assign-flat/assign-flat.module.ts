import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { AssignFlatPageRoutingModule } from './assign-flat-routing.module';

import { AssignFlatPage } from './assign-flat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AssignFlatPageRoutingModule
  ],
  declarations: [AssignFlatPage]
})
export class AssignFlatPageModule {}
