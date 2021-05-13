import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { AssignMemberPageRoutingModule } from './assign-member-routing.module';

import { AssignMemberPage } from './assign-member.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    AssignMemberPageRoutingModule
  ],
  declarations: [AssignMemberPage]
})
export class AssignMemberPageModule {}
