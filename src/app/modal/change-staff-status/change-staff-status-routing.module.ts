import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeStaffStatusPage } from './change-staff-status.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeStaffStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeStaffStatusPageRoutingModule {}
