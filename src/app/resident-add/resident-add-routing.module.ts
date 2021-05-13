import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidentAddPage } from './resident-add.page';

const routes: Routes = [
  {
    path: '',
    component: ResidentAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResidentAddPageRoutingModule {}
