import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { ScanQrCodeDetailsPageRoutingModule } from './scan-qr-code-details-routing.module';

import { ScanQrCodeDetailsPage } from './scan-qr-code-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    ScanQrCodeDetailsPageRoutingModule
  ],
  declarations: [ScanQrCodeDetailsPage]
})
export class ScanQrCodeDetailsPageModule {}
