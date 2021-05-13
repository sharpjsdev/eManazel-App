import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEmergencyContactPage } from './add-emergency-contact.page';

const routes: Routes = [
  {
    path: '',
    component: AddEmergencyContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEmergencyContactPageRoutingModule {}
