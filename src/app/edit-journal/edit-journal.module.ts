import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { EditJournalPageRoutingModule } from './edit-journal-routing.module';

import { EditJournalPage } from './edit-journal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EditJournalPageRoutingModule
  ],
  declarations: [EditJournalPage,MenuHeaderPage]
})
export class EditJournalPageModule {}
