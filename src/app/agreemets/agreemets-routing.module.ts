import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgreemetsPage } from './agreemets.page';

const routes: Routes = [
  {
    path: '',
    component: AgreemetsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgreemetsPageRoutingModule {}
