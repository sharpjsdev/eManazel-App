import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplaintAddPage } from './complaint-add.page';

const routes: Routes = [
  {
    path: '',
    component: ComplaintAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplaintAddPageRoutingModule {}
