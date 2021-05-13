import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaintenanceAddPage } from './maintenance-add.page';

const routes: Routes = [
  {
    path: '',
    component: MaintenanceAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaintenanceAddPageRoutingModule {}
