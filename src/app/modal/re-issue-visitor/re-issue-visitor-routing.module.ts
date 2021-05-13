import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReIssueVisitorPage } from './re-issue-visitor.page';

const routes: Routes = [
  {
    path: '',
    component: ReIssueVisitorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReIssueVisitorPageRoutingModule {}
