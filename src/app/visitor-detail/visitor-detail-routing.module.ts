import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorDetailPage } from './visitor-detail.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorDetailPageRoutingModule {}
