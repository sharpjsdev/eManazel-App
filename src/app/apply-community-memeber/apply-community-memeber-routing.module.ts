import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyCommunityMemeberPage } from './apply-community-memeber.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyCommunityMemeberPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyCommunityMemeberPageRoutingModule {}
