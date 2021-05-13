import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceProviderAgreementPage } from './service-provider-agreement.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceProviderAgreementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderAgreementPageRoutingModule {}
