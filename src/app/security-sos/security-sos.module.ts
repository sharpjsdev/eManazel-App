import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SecuritySosPageRoutingModule } from './security-sos-routing.module';

import { SecuritySosPage } from './security-sos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SecuritySosPageRoutingModule
  ],
  declarations: [SecuritySosPage,MenuHeaderPage]
})
export class SecuritySosPageModule {}
