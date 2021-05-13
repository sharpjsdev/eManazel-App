import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddViolationPage } from './add-violation.page';

const routes: Routes = [
  {
    path: '',
    component: AddViolationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddViolationPageRoutingModule {}
