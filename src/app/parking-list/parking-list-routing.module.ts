import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParkingListPage } from './parking-list.page';

const routes: Routes = [
  {
    path: '',
    component: ParkingListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkingListPageRoutingModule {}
