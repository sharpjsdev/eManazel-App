import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViolationListPage } from './violation-list.page';

const routes: Routes = [
  {
    path: '',
    component: ViolationListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViolationListPageRoutingModule {}
