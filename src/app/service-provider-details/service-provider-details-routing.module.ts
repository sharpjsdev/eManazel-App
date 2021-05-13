import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceProviderDetailsPage } from './service-provider-details.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceProviderDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderDetailsPageRoutingModule {}
