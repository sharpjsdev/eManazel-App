import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';

import { SignupFormPageRoutingModule } from './signup-form-routing.module';

import { SignupFormPage } from './signup-form.page';
import { SharedPasswordMatchPageModule } from '../shared-password-match/shared-password-match.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    SignupFormPageRoutingModule,
    SharedPasswordMatchPageModule
  ],
  declarations: [SignupFormPage]
})
export class SignupFormPageModule {}
