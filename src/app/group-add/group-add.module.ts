import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupAddPageRoutingModule } from './group-add-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { GroupAddPage } from './group-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    GroupAddPageRoutingModule
  ],
  declarations: [GroupAddPage,MenuHeaderPage]
})
export class GroupAddPageModule {}
