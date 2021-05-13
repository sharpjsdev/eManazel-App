import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignFlatPage } from './assign-flat.page';

const routes: Routes = [
  {
    path: '',
    component: AssignFlatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignFlatPageRoutingModule {}
