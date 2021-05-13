import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PanicAlertsPage } from './panic-alerts.page';

const routes: Routes = [
  {
    path: '',
    component: PanicAlertsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PanicAlertsPageRoutingModule {}
