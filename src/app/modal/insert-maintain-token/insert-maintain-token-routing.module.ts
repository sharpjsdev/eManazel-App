import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InsertMaintainTokenPage } from './insert-maintain-token.page';

const routes: Routes = [
  {
    path: '',
    component: InsertMaintainTokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InsertMaintainTokenPageRoutingModule {}
