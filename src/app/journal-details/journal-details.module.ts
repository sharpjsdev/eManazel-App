import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JournalDetailsPageRoutingModule } from './journal-details-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { JournalDetailsPage } from './journal-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    JournalDetailsPageRoutingModule
  ],
  declarations: [JournalDetailsPage,MenuHeaderPage]
})
export class JournalDetailsPageModule {}
