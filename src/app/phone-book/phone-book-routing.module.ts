import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneBookPage } from './phone-book.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneBookPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneBookPageRoutingModule {}
