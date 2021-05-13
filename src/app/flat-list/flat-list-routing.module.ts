import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlatListPage } from './flat-list.page';

const routes: Routes = [
  {
    path: '',
    component: FlatListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlatListPageRoutingModule {}
