import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { AddEmergencyContactPageRoutingModule } from './add-emergency-contact-routing.module';

import { AddEmergencyContactPage } from './add-emergency-contact.page';

@NgModule({
  imports: [
    CommonModule, 
    FormsModule,
    IonicModule,
    TranslateModule,
    AddEmergencyContactPageRoutingModule
  ],
  declarations: [AddEmergencyContactPage,MenuHeaderPage]
})
export class AddEmergencyContactPageModule {}
