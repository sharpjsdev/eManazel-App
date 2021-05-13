import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeRequestStatusPage } from './change-request-status.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeRequestStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeRequestStatusPageRoutingModule {}
