import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { GroupListPageRoutingModule } from './group-list-routing.module';

import { GroupListPage } from './group-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    GroupListPageRoutingModule
  ],
  declarations: [GroupListPage,MenuHeaderPage]
})
export class GroupListPageModule {}
