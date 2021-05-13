import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdsAddPage } from './ads-add.page';

const routes: Routes = [
  {
    path: '',
    component: AdsAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdsAddPageRoutingModule {}
