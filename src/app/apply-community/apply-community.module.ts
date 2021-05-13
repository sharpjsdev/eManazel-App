import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ApplyCommunityPageRoutingModule } from './apply-community-routing.module';

import { ApplyCommunityPage } from './apply-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ApplyCommunityPageRoutingModule
  ],
  declarations: [ApplyCommunityPage,MenuHeaderPage]
})
export class ApplyCommunityPageModule {}
