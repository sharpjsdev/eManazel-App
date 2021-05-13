import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyCommunityPage } from './apply-community.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyCommunityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyCommunityPageRoutingModule {}
