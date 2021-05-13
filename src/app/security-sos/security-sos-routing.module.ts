import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecuritySosPage } from './security-sos.page';

const routes: Routes = [
  {
    path: '',
    component: SecuritySosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecuritySosPageRoutingModule {}
