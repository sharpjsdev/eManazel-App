import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SosListPage } from './sos-list.page';

const routes: Routes = [
  {
    path: '',
    component: SosListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SosListPageRoutingModule {}
