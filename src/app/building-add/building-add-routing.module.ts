import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuildingAddPage } from './building-add.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingAddPageRoutingModule {}
