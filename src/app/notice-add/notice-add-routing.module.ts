import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticeAddPage } from './notice-add.page';

const routes: Routes = [
  {
    path: '',
    component: NoticeAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticeAddPageRoutingModule {}
