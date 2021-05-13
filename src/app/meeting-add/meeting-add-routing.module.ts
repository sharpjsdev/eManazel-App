import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeetingAddPage } from './meeting-add.page';

const routes: Routes = [
  {
    path: '',
    component: MeetingAddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeetingAddPageRoutingModule {}
