import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingServicePage } from './building-service.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingServicePageRoutingModule {}
