import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { CommunityListPageRoutingModule } from './community-list-routing.module';

import { CommunityListPage } from './community-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CommunityListPageRoutingModule
  ],
  declarations: [CommunityListPage]
})
export class CommunityListPageModule {}
