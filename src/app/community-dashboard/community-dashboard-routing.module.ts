import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommunityDashboardPage } from './community-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: CommunityDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityDashboardPageRoutingModule {}
