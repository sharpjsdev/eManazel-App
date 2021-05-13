import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditEmergencyContactPage } from './edit-emergency-contact.page';

const routes: Routes = [
  {
    path: '',
    component: EditEmergencyContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditEmergencyContactPageRoutingModule {}
