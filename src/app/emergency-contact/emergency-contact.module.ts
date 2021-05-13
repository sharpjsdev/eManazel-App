import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { EmergencyContactPageRoutingModule } from './emergency-contact-routing.module';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { EmergencyContactPage } from './emergency-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EmergencyContactPageRoutingModule
  ],
  declarations: [EmergencyContactPage,MenuHeaderPage]
})
export class EmergencyContactPageModule {}
