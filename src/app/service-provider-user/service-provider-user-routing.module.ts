import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServiceProviderUserPage } from './service-provider-user.page';

const routes: Routes = [
  {
    path: '',
    component: ServiceProviderUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceProviderUserPageRoutingModule {}
