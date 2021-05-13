import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanQrCodeDetailsPage } from './scan-qr-code-details.page';

const routes: Routes = [
  {
    path: '',
    component: ScanQrCodeDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanQrCodeDetailsPageRoutingModule {}
