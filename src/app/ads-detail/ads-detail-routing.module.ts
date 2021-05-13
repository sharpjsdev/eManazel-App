import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdsDetailPage } from './ads-detail.page';

const routes: Routes = [
  {
    path: '',
    component: AdsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdsDetailPageRoutingModule {}
