import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestAddMorePage } from './test-add-more.page';

const routes: Routes = [
  {
    path: '',
    component: TestAddMorePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestAddMorePageRoutingModule {}
