import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidentListPage } from './resident-list.page';

const routes: Routes = [
  {
    path: '',
    component: ResidentListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResidentListPageRoutingModule {}
