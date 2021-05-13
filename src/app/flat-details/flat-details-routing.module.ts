import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlatDetailsPage } from './flat-details.page';

const routes: Routes = [
  {
    path: '',
    component: FlatDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlatDetailsPageRoutingModule {}
