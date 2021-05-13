import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlatEditPage } from './flat-edit.page';

const routes: Routes = [
  {
    path: '',
    component: FlatEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FlatEditPageRoutingModule {}
