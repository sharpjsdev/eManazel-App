import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemsConditionsPage } from './tems-conditions.page';

const routes: Routes = [
  {
    path: '',
    component: TemsConditionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TemsConditionsPageRoutingModule {}
