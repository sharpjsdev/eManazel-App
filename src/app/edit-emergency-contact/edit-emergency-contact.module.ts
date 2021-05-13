import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { MenuHeaderPage } from '../menu-header/menu-header.page';
import { EditEmergencyContactPageRoutingModule } from './edit-emergency-contact-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { EditEmergencyContactPage } from './edit-emergency-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    EditEmergencyContactPageRoutingModule
  ],
  declarations: [EditEmergencyContactPage,MenuHeaderPage]
})
export class EditEmergencyContactPageModule {}
