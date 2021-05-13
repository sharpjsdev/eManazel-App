import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContractAddPage } from './contract-add.page';

const routes: Routes = [
  {
    path: '',
    component: ContractAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContractAddPageRoutingModule {}
