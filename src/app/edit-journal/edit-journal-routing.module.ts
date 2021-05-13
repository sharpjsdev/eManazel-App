import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditJournalPage } from './edit-journal.page';

const routes: Routes = [
  {
    path: '',
    component: EditJournalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditJournalPageRoutingModule {}
