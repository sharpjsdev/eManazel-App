import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { ApplyCommunityMemeberPageRoutingModule } from './apply-community-memeber-routing.module';

import { ApplyCommunityMemeberPage } from './apply-community-memeber.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ApplyCommunityMemeberPageRoutingModule
  ],
  declarations: [ApplyCommunityMemeberPage,MenuHeaderPage]
})
export class ApplyCommunityMemeberPageModule {}
