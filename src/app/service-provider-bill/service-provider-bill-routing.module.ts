import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceProviderBillPage } from './service-provider-bill.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceProviderBillPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderBillPageRoutingModule {}
