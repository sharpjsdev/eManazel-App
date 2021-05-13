import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeJobStatusPage } from './change-job-status.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeJobStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeJobStatusPageRoutingModule {}
