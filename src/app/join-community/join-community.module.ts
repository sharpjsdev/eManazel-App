import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { JoinCommunityPageRoutingModule } from './join-community-routing.module';

import { JoinCommunityPage } from './join-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    JoinCommunityPageRoutingModule
  ],
  declarations: [JoinCommunityPage,MenuHeaderPage]
})
export class JoinCommunityPageModule {}
