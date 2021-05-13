import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewItemListPage } from './view-item-list.page';

const routes: Routes = [
  {
    path: '',
    component: ViewItemListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewItemListPageRoutingModule {}
