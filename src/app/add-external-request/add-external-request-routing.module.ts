import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddExternalRequestPage } from './add-external-request.page';

const routes: Routes = [
  {
    path: '',
    component: AddExternalRequestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddExternalRequestPageRoutingModule {}
