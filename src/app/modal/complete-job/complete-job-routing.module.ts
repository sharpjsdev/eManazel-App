import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompleteJobPage } from './complete-job.page';

const routes: Routes = [
  {
    path: '',
    component: CompleteJobPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompleteJobPageRoutingModule {}
