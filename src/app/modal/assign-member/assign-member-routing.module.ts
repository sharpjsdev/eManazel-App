import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignMemberPage } from './assign-member.page';

const routes: Routes = [
  {
    path: '',
    component: AssignMemberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignMemberPageRoutingModule {}
