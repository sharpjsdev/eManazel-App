import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitorAddPage } from './visitor-add.page';

const routes: Routes = [
  {
    path: '',
    component: VisitorAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitorAddPageRoutingModule {}
