import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditNoticePage } from './edit-notice.page';

const routes: Routes = [
  {
    path: '',
    component: EditNoticePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditNoticePageRoutingModule {}
