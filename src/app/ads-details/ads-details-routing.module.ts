import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdsDetailsPage } from './ads-details.page';

const routes: Routes = [
  {
    path: '',
    component: AdsDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdsDetailsPageRoutingModule {}
