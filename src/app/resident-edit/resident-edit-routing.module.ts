import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResidentEditPage } from './resident-edit.page';

const routes: Routes = [
  {
    path: '',
    component: ResidentEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResidentEditPageRoutingModule {}
