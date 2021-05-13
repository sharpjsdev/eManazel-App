import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExternalRequestListPage } from './external-request-list.page';

const routes: Routes = [
  {
    path: '',
    component: ExternalRequestListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExternalRequestListPageRoutingModule {}
