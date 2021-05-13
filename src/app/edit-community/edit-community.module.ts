import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { EditCommunityPageRoutingModule } from './edit-community-routing.module';

import { EditCommunityPage } from './edit-community.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EditCommunityPageRoutingModule
  ],
  declarations: [EditCommunityPage]
})
export class EditCommunityPageModule {}
