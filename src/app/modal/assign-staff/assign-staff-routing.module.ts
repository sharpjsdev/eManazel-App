import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignStaffPage } from './assign-staff.page';

const routes: Routes = [
  {
    path: '',
    component: AssignStaffPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignStaffPageRoutingModule {}
