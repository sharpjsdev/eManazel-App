import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractDetailPage } from './contract-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ContractDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractDetailPageRoutingModule {}
