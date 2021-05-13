import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplyServiceProviderPage } from './apply-service-provider.page';

const routes: Routes = [
  {
    path: '',
    component: ApplyServiceProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApplyServiceProviderPageRoutingModule {}
