import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeContractStatusPage } from './change-contract-status.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeContractStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeContractStatusPageRoutingModule {}
