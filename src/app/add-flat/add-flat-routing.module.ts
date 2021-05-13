import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFlatPage } from './add-flat.page';

const routes: Routes = [
  {
    path: '',
    component: AddFlatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFlatPageRoutingModule {}
