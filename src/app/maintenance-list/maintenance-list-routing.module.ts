import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceListPage } from './maintenance-list.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceListPageRoutingModule {}
