import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeMaintenanceRequestStatusPage } from './change-maintenance-request-status.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeMaintenanceRequestStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeMaintenanceRequestStatusPageRoutingModule {}
