import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnitListPage } from './unit-list.page';

const routes: Routes = [
  {
    path: '',
    component: UnitListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitListPageRoutingModule {}
