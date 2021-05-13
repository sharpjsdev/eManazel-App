import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExternalRequestDetailPage } from './external-request-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ExternalRequestDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExternalRequestDetailPageRoutingModule {}
