import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplaintRejectPage } from './complaint-reject.page';

const routes: Routes = [
  {
    path: '',
    component: ComplaintRejectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplaintRejectPageRoutingModule {}
